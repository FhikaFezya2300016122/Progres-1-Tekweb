import React from 'react';

const AboutUs = () => {
  return (
    <section className="relative bg-gray-100 py-12 px-6 md:px-12 lg:px-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/fashion-background.jpg')" }}
      ></div>

      {/* Kontainer Utama */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 md:p-12">
        {/* Judul */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-red-700 mb-8">
          About Us
        </h1>

        {/* Konten Flex */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Kiri */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Selamat Datang di <span className="text-red-600">Dress Up</span>!
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Di DressUp, kami percaya bahwa fashion adalah bentuk ekspresi diri. Platform kami hadir untuk menginspirasi kreativitas Anda dengan berbagai mix-and-match outfit yang sempurna sesuai dengan suasana hati, kepribadian, dan acara Anda.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Misi Kami</h3>
            <p className="text-gray-700 leading-relaxed">
              Memberdayakan individu untuk mengekspresikan diri melalui fashion. Dengan alat intuitif kami, proses styling menjadi lebih sederhana dan menyenangkan.
            </p>
          </div>

          {/* Kanan */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Mengapa Memilih <span className="text-red-600">Dress Up</span>?
            </h3>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
              <li>Antarmuka ramah pengguna dengan koleksi beragam untuk setiap acara.</li>
              <li>Jadikan fashion lebih menyenangkan dan ubah wardrobe Anda dengan mudah.</li>
              <li>Temukan gaya yang unik dan ekspresikan diri Anda bersama kami!</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Apa yang Kami Tawarkan?</h3>
            <ul className="list-none text-gray-700 space-y-2">
              <li>
                <strong className="text-red-600">Mix-and-Match:</strong> Eksperimen dengan atasan, bawahan, dan aksesori.
              </li>
              <li>
                <strong className="text-red-600">Inspirasi Gaya:</strong> Temukan outfit sesuai tren terbaru.
              </li>
              <li>
                <strong className="text-red-600">Rekomendasi Pribadi:</strong> Dapatkan saran sesuai preferensi.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
