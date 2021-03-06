// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBozP-nzVAwq3UNF4yu0AM2V1T9pweXNPo",
    authDomain: "fir-papaninformasi.firebaseapp.com",
    projectId: "fir-papaninformasi",
    storageBucket: "fir-papaninformasi.appspot.com",
    messagingSenderId: "920683588565",
    appId: "1:920683588565:web:0d12936bf5cb11f0c56b5c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var d = new Date();
var t = d.getTime();
var counter = t;

/*================Mengambil Referensi Database =================*/
//Membuat ID untuk parameter data
console.log(counter);
counter += 1;
console.log(counter);
var id = counter;

// referensi ke database
var db = firebase.database();

//referensi untuk tampilkan data
var prokerRef = db.ref("proker/keilmuan");

//referensi untuk tambah data 
var addprokerRef = db.ref("proker/keilmuan/" + id);

// PEMATERI SECTION
/*================Mengambil data dari form=================*/
document.getElementById("form-keilmuan").addEventListener("submit", e => {
    var kdapp = document.getElementById("kdapp-keilmuan").value;
    var vps = document.getElementById("vps-keilmuan").value;
    var adm = document.getElementById("adm-keilmuan").value;
    var fol = document.getElementById("fol-keilmuan").value;
    var free = document.getElementById("free-keilmuan").value;
    var inst = document.getElementById("inst-keilmuan").value;
    e.preventDefault();
    createProker(id, kdapp, vps, adm, fol, free, inst);
});

function createProker(id, kdapp, vps, adm, fol, free, inst) {

    //============ Input data ke database beserta url image ==================//
    addprokerRef.set({
        id: id,
        kedai_app: kdapp,
        vps: vps,
        administrasi: adm,
        folder_cermat: fol,
        free_repair: free,
        pembelajaran_instansi: inst
    });

    //reload setelah submit data
    window.location.reload();
}


// /*================Menampilkan data dari Database=================*/
//menampilkan data  
prokerRef.on("value", dataBerhasil, dataGagal);
//membuat variabel untuk passing data ke table surat
var view_proker = document.getElementById("table-keilmuan");

function dataBerhasil(data) {
    //membuat variabel kosong sebagai tempat menyimpan hasil loopingan data
    var tabel_proker = "";
    var nomor = 1;
    data.forEach(function (cetak) {
        tabel_proker +=
            "<tr>" +
            "<td>" + nomor + "</td>" +
            "<td>" + cetak.val().kedai_app + "</td>" +
            "<td>" + cetak.val().vps + "</td>" +
            "<td>" + cetak.val().administrasi + "</td>" +
            "<td>" + cetak.val().folder_cermat + "</td>" +
            "<td>" + cetak.val().free_repair + "</td>" +
            "<td>" + cetak.val().pembelajaran_instansi + "</td>" +
            '<td><button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#bs-example-modal-lg-2" onclick="editProker(\'' + cetak.val().id + '\')">Edit</button> <button class="btn btn-sm btn-danger" onclick="deleteProker(\'' + cetak.val().id + "')\">Hapus</button></td>" +
            "</tr>";
        nomor++;
    });
    //passing data dari variable tabel ke view_surat 
    view_proker.innerHTML = tabel_proker;
}
function dataGagal(err) {
    console.log(err);
}

// /*================ MENGEDIT DATA =================*/
//menangkap parameter id yang dikirim ketika menekan tombol action edit
//edit data surat 
function editProker(id) {

    var query = db.ref('proker/keilmuan/' + id);

    // suatu perintah untuk mengambil data spesifik dari database berdasarkan id
    query.once('value').then(isieditProker);

    //function untuk passing data ke form edit data surat
    function isieditProker(dataProker) {
        var data = dataProker.val();
        document.getElementById('kdapp-keilmuan-edit').value = data.kedai_app;
        document.getElementById('vps-keilmuan-edit').value = data.vps;
        document.getElementById('adm-keilmuan-edit').value = data.administrasi;
        document.getElementById('fol-keilmuan-edit').value = data.folder_cermat;
        document.getElementById('free-keilmuan-edit').value = data.free_repair;
        document.getElementById('inst-keilmuan-edit').value = data.pembelajaran_instansi;
    }

    //listener tombol update pada form edit surat
    document.getElementById("form-keilmuan-edit").addEventListener("submit", e => {
        //memasukkan value dari form input ke dalam variable

        var kdapp_edit = document.getElementById('kdapp-keilmuan-edit').value;
        var vps_edit = document.getElementById('vps-keilmuan-edit').value;
        var adm_edit = document.getElementById('adm-keilmuan-edit').value;
        var fol_edit = document.getElementById('fol-keilmuan-edit').value;
        var free_edit = document.getElementById('free-keilmuan-edit').value;
        var inst_edit = document.getElementById('inst-keilmuan-edit').value;

        //membuat variable yg akan menampung field database dan data yg akan di input ke database
        var newdataEdit = {
            id: id,
            kedai_app: kdapp_edit,
            vps: vps_edit,
            administrasi: adm_edit,
            folder_cermat: fol_edit,
            free_repair: free_edit,
            pembelajaran_instansi: inst_edit
        };

        //update data ke database
        prokerRef.child(id).update(newdataEdit);

        //reload setelah submit data
        window.location.reload();

        e.preventDefault();
    });

}


// /*================MENGHAPUS DATA=================*/

function deleteProker(id) {
    var cek_hapus = confirm('Apakah anda ingin menghapus data ?');
    if (cek_hapus) {
        prokerRef.child(id).remove();
    }
}

