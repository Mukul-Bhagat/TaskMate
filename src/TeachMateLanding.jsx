import React from "react";
import { Link } from "react-router-dom";

export default function TeachMateLanding() {
  return (
    <>
      {/* Meta and fonts, ideally place these in public/index.html */}
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>TeachMate - Empowering Students &amp; Teachers</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?display=swap&family=Lexend:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <div className="overflow-x-hidden relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* --- THIS IS THE FIX --- */}
              <Link to="/" className="flex items-center gap-3">
                <svg
                  className="h-8 w-8 text-sky-600"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                    fill="currentColor"
                  />
                  <path
                    clipRule="evenodd"
                    d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                <h2 className="text-gray-900 text-xl font-bold">TeachMate</h2>
              </Link>
              {/* --- END OF FIX --- */}
              <div>
                <Link
                  className="rounded-md px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-sm transform hover:scale-110 hover:text-white"
                  to="/TeacherRegistration"
                >
                  Sign in as Teacher
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow">
                  <section className="relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeE69lWGKbwgUOPMNpy3H1oxWCwBC3-Yifot6lWVu0NDmucb0u-Y0hcqgdjDCnx24yWABAZc2pNnEZnqr-Z_HkKkHoTi0SfBnv1RPPobBiB0v4_4rO7PWV0WASvUr1CU4SA6EzC9Te8h76uXIgE2jpiLAxFA5xYbigBHL4NQHqkw98ZMaWppSdMDuK8EAUX4p4fqeu6VOw37RgaCe8YHYk3cY_sNchGUjmTIGEN7XJAtaafemx-Ta60jQQrtIZhgs-r3FI8KNwdlg")',
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative w-full px-4 sm:px-6 lg:px-8 py-32 sm:py-48 lg:py-64 text-center text-white">
                      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight">
                        Unlock Your Potential with TeachMate
                      </h1>
                      <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed text-gray-200">
                        The ultimate platform connecting students and teachers for a
                        seamless learning experience.
                      </p>
                      <div className="mt-10 flex justify-center">
                        <Link
                          className="rounded-lg px-20 py-5 text-xl font-semibold text-white backdrop-blur-md border border-white transition-colors transform hover:scale-110 hover:text-white"
                          to="/StudentRegistration"
                        >
                          Sign in as Student
                        </Link>
                      </div>
                    </div>
                  </section>
        
                  <section className="py-20 sm:py-28 bg-white">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          Key Features of TeachMate
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                          Our platform offers a range of features designed to enhance
                          the learning and teaching experience.
                        </p>
                      </div>
                      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-600 text-white mb-6">
                            <span className="material-symbols-outlined text-6xl">
                              person_add
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Easy Registration
                          </h3>
                          <p className="mt-2 text-base text-gray-600">
                            Quickly sign up as a student or teacher.
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-600 text-white mb-6">
                            <span className="material-symbols-outlined text-6xl">
                              dashboard
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Personalized Dashboards
                          </h3>
                          <p className="mt-2 text-base text-gray-600">
                            Access a tailored dashboard for your role.
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-600 text-white mb-6">
                            <span className="material-symbols-outlined text-4xl">
                              quiz
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            AI-Powered Quizzes
                          </h3>
                          <p className="mt-2 text-base text-gray-600">
                            Utilize AI-driven quizzes and track your progress.
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform transform hover:-translate-y-2">
                          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-600 text-white mb-6">
                            <span className="material-symbols-outlined text-4xl">
                              devices
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Responsive Design
                          </h3>
                          <p className="mt-2 text-base text-gray-600">
                            Enjoy a seamless experience on any device.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
        
                  <section className="py-20 sm:py-28 bg-gray-50">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          How to Use TeachMate
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                          Getting started is simple. Follow these three easy steps to
                          begin your journey.
                        </p>
                      </div>
                      <div className="mt-16 grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-sky-600 text-white mb-6 text-3xl font-bold">
                            1
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Register</h3>
                          <p className="mt-2 text-base text-gray-600">
                            Create your account as a student or teacher in just a few
                            clicks.
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-sky-600 text-white mb-6 text-3xl font-bold">
                            2
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
                          <p className="mt-2 text-base text-gray-600">
                            Find and connect with teachers or students that match your
                            needs.
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-sky-600 text-white mb-6 text-3xl font-bold">
                            3
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Engage</h3>
                          <p className="mt-2 text-base text-gray-600">
                            Start learning or teaching through our interactive platform and
                            tools.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
        
                  <section className="py-20 sm:py-28 bg-white">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          What Our Users Say About Us
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                          Hear from students and teachers who have experienced the TeachMate
                          difference.
                        </p>
                      </div>
                      <div className="mt-16 grid gap-8 lg:grid-cols-2">
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                          <p className="text-lg text-gray-600">
                            "TeachMate has revolutionized the way I approach learning. The AI
                            quizzes are incredibly helpful, and the platform is so easy to
                            use. I've seen a significant improvement in my grades!"
                          </p>
                          <div className="mt-6 flex items-center">
                            <img
                              alt="Student testimonial"
                              className="h-14 w-14 rounded-full"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUmozVG3v6OezzLHQW22BZOHL1y9pDtFxmwi5kd-Ojiu7Wqnv2DV9QoJmtjn-La1JPZOuwf3Ji8RTSvgyYJlqZGMulnSDhg_64bUtCNj7R7Rycvvg7QSbXjaguaIm_uHlydJEfoKSVLOH-2KZ-SP2oiqNweDPGqFn8L8k7bqYwuPwgg1ckJZ-fNDnee-Sm-pehHVMk7M0EpNpcq2mb990CQY154FecZZrZhY1IyzH807YcAEXEcgAfm7VmUmhax9Qt0p01D_i67xw"
                            />
                            <div className="ml-4">
                              <p className="text-base font-semibold text-gray-900">
                                Sarah L., Student
                              </p>
                              <p className="text-sm text-gray-600">High School</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                          <p className="text-lg text-gray-600">
                            "As a teacher, managing assignments and tracking student progress
                            has never been easier. TeachMate provides the tools I need to
                            create a more engaging and effective learning environment for my
                            students."
                          </p>
                          <div className="mt-6 flex items-center">
                            <img
                              alt="Teacher testimonial"
                              className="h-14 w-14 rounded-full"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKuoQzJoMSN2f5_8bKXgilReBtL296IpCLAq4DDZFD5V2QlezHeqr1bI75e2Vs3h69_Tl2oXvX1dBcXsc8COEfbSVHH0C4RfP5DKEb4EdVA0QPiBEcgWLDyPuxpZ44aWNVZyk8Jo3Slh-89p2TnuwTb0c6_jyVj41b3ZGTybNktgdeRZWDmmHd7lx-a15UDeAKHLHrC02-bw9FcyN7mr3l7pBA8HJopggK-OQLz4RJEEI73M_zUY6Lpam-li5hsTRZvNeLrErqlGE"
                            />
                            <div className="ml-4">
                              <p className="text-base font-semibold text-gray-900">
                                David Chen, Teacher
                              </p>
                              <p className="text-sm text-gray-600">Mathematics Department</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
        
                  <section className="py-20 sm:py-28 bg-gray-50">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          Benefits of TeachMate
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                          Discover the advantages of joining our educational community.
                        </p>
                      </div>
                      <div className="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-3">
                        <div className="flex flex-col items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sky-600 text-white mb-4">
                            <span className="material-symbols-outlined">school</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">For Students</h3>
                          <p className="mt-2 text-base text-gray-600">
                            Access a wide range of subjects, get personalized help from
                            qualified teachers, and improve your grades with our interactive
                            tools and AI-powered quizzes.
                          </p>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sky-600 text-white mb-4">
                            <span className="material-symbols-outlined">cast_for_education</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">For Teachers</h3>
                          <p className="mt-2 text-base text-gray-600">
                            Expand your reach, manage your students efficiently, and utilize
                            our advanced tools to create engaging lesson plans and track
                            student progress with ease.
                          </p>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sky-600 text-white mb-4">
                            <span className="material-symbols-outlined">groups</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">For Both</h3>
                          <p className="mt-2 text-base text-gray-600">
                            Join a supportive community dedicated to lifelong learning.
                            Collaborate, share knowledge, and grow together on a platform
                            that values education and connection.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </main>
        
                <footer className="bg-gray-800 text-white">
                  <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <svg
                            className="h-8 w-8 text-sky-600"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                              fill="currentColor"
                            />
                            <path
                              clipRule="evenodd"
                              d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                              fill="currentColor"
                              fillRule="evenodd"
                            />
                          </svg>
                          <h2 className="text-xl font-bold">TeachMate</h2>
                        </div>
                        <p className="text-gray-400">
                          Empowering students and teachers through a connected learning
                          experience.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                          <li>
                            <a
                              className="text-gray-400 hover:text-white transition-colors"
                              href="#"
                            >
                              About Us
                            </a>
                          </li>
                          <li>
                            <a
                              className="text-gray-400 hover:text-white transition-colors"
                              href="#"
                            >
                              Features
                            </a>
                          </li>
                          <li>
                            <a
                              className="text-gray-400 hover:text-white transition-colors"
                              href="#"
                            >
                              Testimonials
                            </a>
                          </li>
                          <li>
                            <a
                              className="text-gray-400 hover:text-white transition-colors"
                              href="#"
                            >
                              Contact
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                          <li>
                            <a
                              className="text-gray-400 hover:text-white transition-colors"
                              href="#"
                            >
                              Terms of Service
                            </a>
                          </li>
                          <li>
                            <a
                              className="text-gray-400 hover:text-white transition-colors"
                              href="#"
                            >
                              Privacy Policy
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                          <a
                            className="text-gray-400 hover:text-white transition-colors"
                            href="#"
                          >
                            <svg
                              className="h-6 w-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M22.46 6c-.8.36-1.65.6-2.54.7c.9-.54 1.6-1.4 1.92-2.45c-.84.5-1.77.86-2.77 1.06c-.8-0.85-1.92-1.38-3.13-1.38c-2.36,0-4.28,1.92-4.28,4.28c0,0.33,0.04,0.65,0.1,0.96C8.26 9.06 4.37 6.95 1.78 3.7c-0.45,0.78-0.7,1.68-0.7,2.65c0,1.48,0.75,2.78,1.9,3.54C2.2 9.84,1.5,9.63,0.9,9.3v0.05c0,2.07,1.47,3.8,3.42,4.2c-0.36,0-0.74,0.15-1.12,0.15c-0.27,0-0.54-0.03-0.8-0.08c0.54,1.7,2.12,2.93,4,2.96c-1.46,1.14-3.3,1.82-5.3,1.82c-0.34,0-0.68-0.02-1.02-0.06C2.33 20.35,4.5,21,6.86,21c7.03,0,10.88-5.83,10.88-10.88c0-0.16,0-0.33-0.01-0.49c0.75-0.54,1.4-1.22,1.92-2" />
                            </svg>
                          </a>
                          <a
                            className="text-gray-400 hover:text-white transition-colors"
                            href="#"
                          >
                            <svg
                              className="h-6 w-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm3.62 10.5h-1.9v6h-3v-6H9.5V8.5h2.22V6.93c0-1.74 0.94-2.93 2.93-2.93h1.8v2h-1.11c-0.78,0-0.89,0.33-0.89,0.83v1.67h2l-0.25,2z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                      <p>© 2024 TeachMate. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </div>
            </>
          );
        }
        
