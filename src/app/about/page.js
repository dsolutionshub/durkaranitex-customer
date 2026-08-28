import Link from "next/link";
import Image from "next/image";

import "./about-page.css";

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 30 36" fill="none">
    <path d="M14.5026 0.75V34.75M14.5025 29.5818L27.5926 23.2238M14.5025 21.0811L27.0315 14.9951M14.5025 12.5811L23.0536 8.41613M15.5402 1.107C14.9282 0.631 14.0783 0.631 13.4663 1.107C10.2363 3.572 0.699204 11.613 0.750204 20.98C0.750204 28.562 6.92127 34.75 14.5203 34.75C22.1193 34.75 28.2902 28.579 28.2902 20.997C28.3072 11.766 18.7532 3.589 15.5402 1.107Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
    <path d="M30.75 11.2501H31.5C31.5 11.1259 31.4692 11.0038 31.4104 10.8945L30.75 11.2501ZM29.6516 20.6517L29.1213 20.1214L29.1213 20.1214L29.6516 20.6517ZM16.3906 0.970307L16.1588 1.6836L16.1588 1.6836L16.3906 0.970307ZM19.2798 3.85948L19.993 3.62772L19.993 3.62772L19.2798 3.85948ZM19.6468 9.17711L20.3601 8.94535L20.3601 8.94535L19.6468 9.17711ZM21.5729 11.1032L21.3412 11.8165L21.3412 11.8165L21.5729 11.1032ZM5.21266 22.4578C5.62636 22.4784 5.97845 22.1598 5.99907 21.7461C6.01969 21.3324 5.70104 20.9803 5.28734 20.9597L5.25 21.7087L5.21266 22.4578ZM1.84835 20.6517L2.37868 20.1214L2.37868 20.1214L1.84835 20.6517ZM26.2127 20.9597C25.799 20.9803 25.4803 21.3324 25.5009 21.7461C25.5216 22.1598 25.8736 22.4784 26.2873 22.4578L26.25 21.7087L26.2127 20.9597ZM0.75 6.10352e-05C0.335786 6.10352e-05 0 0.335847 0 0.750061C0 1.16427 0.335786 1.50006 0.75 1.50006V0.750061V6.10352e-05ZM1.5404 17.2127C1.51977 16.799 1.16769 16.4804 0.753987 16.501C0.340287 16.5216 0.0216342 16.8737 0.0422557 17.2874L0.791326 17.2501L1.5404 17.2127ZM0.75 6.00006C0.335786 6.00006 0 6.33585 0 6.75006C0 7.16427 0.335786 7.50006 0.75 7.50006V6.75006V6.00006ZM9.75 7.50006C10.1642 7.50006 10.5 7.16427 10.5 6.75006C10.5 6.33585 10.1642 6.00006 9.75 6.00006V6.75006V7.50006ZM0.75 10.5001C0.335786 10.5001 0 10.8358 0 11.2501C0 11.6643 0.335786 12.0001 0.75 12.0001V11.2501V10.5001ZM6.75 12.0001C7.16421 12.0001 7.5 11.6643 7.5 11.2501C7.5 10.8358 7.16421 10.5001 6.75 10.5001V11.2501V12.0001ZM19.5 3.00006C19.0858 3.00006 18.75 3.33585 18.75 3.75006C18.75 4.16427 19.0858 4.50006 19.5 4.50006V3.75006V3.00006ZM28.8354 7.69431L28.175 8.04989L28.175 8.04989L28.8354 7.69431ZM26.3946 4.28063L26.01 4.92451L26.01 4.92451L26.3946 4.28063ZM26.25 21.7501H25.5C25.5 22.9927 24.4926 24.0001 23.25 24.0001V24.7501V25.5001C25.3211 25.5001 27 23.8211 27 21.7501H26.25ZM23.25 24.7501V24.0001C22.0074 24.0001 21 22.9927 21 21.7501H20.25H19.5C19.5 23.8211 21.1789 25.5001 23.25 25.5001V24.7501ZM20.25 21.7501H21C21 20.5074 22.0074 19.5001 23.25 19.5001V18.7501V18.0001C21.1789 18.0001 19.5 19.679 19.5 21.7501H20.25ZM23.25 18.7501V19.5001C24.4926 19.5001 25.5 20.5074 25.5 21.7501H26.25H27C27 19.679 25.3211 18.0001 23.25 18.0001V18.7501ZM11.25 21.7501H10.5C10.5 22.9927 9.49264 24.0001 8.25 24.0001V24.7501V25.5001C10.3211 25.5001 12 23.8211 12 21.7501H11.25ZM8.25 24.7501V24.0001C7.00736 24.0001 6 22.9927 6 21.7501H5.25H4.5C4.5 23.8211 6.17893 25.5001 8.25 25.5001V24.7501ZM5.25 21.7501H6C6 20.5074 7.00736 19.5001 8.25 19.5001V18.7501V18.0001C6.17893 18.0001 4.5 19.679 4.5 21.7501H5.25ZM8.25 18.7501V19.5001C9.49264 19.5001 10.5 20.5074 10.5 21.7501H11.25H12C12 19.679 10.3211 18.0001 8.25 18.0001V18.7501ZM30.75 11.2501H30V14.2501H30.75H31.5V11.2501H30.75ZM23.7 11.2501V12.0001H30.75V11.2501V10.5001H23.7V11.2501ZM30.75 14.2501H30C30 16.039 29.9984 17.3053 29.8694 18.2649C29.7433 19.2029 29.5079 19.7348 29.1213 20.1214L29.6516 20.6517L30.182 21.182C30.8937 20.4703 31.2075 19.5691 31.356 18.4648C31.5016 17.382 31.5 15.9966 31.5 14.2501H30.75ZM13.2 0.750061V1.50006C14.9335 1.50006 15.6224 1.50931 16.1588 1.6836L16.3906 0.970307L16.6223 0.257014C15.803 -0.00919201 14.8168 6.10352e-05 13.2 6.10352e-05V0.750061ZM19.5 7.05006H20.25C20.25 5.43328 20.2593 4.44702 19.993 3.62772L19.2798 3.85948L18.5665 4.09125C18.7407 4.62764 18.75 5.31653 18.75 7.05006H19.5ZM16.3906 0.970307L16.1588 1.6836C17.3005 2.05454 18.1955 2.9496 18.5665 4.09125L19.2798 3.85948L19.993 3.62772C19.4737 2.02942 18.2206 0.776333 16.6223 0.257014L16.3906 0.970307ZM19.5 7.05006H18.75C18.75 8.10845 18.7407 8.81553 18.9335 9.40888L19.6468 9.17711L20.3601 8.94535C20.2593 8.6349 20.25 8.2252 20.25 7.05006H19.5ZM23.7 11.2501V10.5001C22.5249 10.5001 22.1152 10.4908 21.8047 10.3899L21.5729 11.1032L21.3412 11.8165C21.9345 12.0093 22.6416 12.0001 23.7 12.0001V11.2501ZM19.6468 9.17711L18.9335 9.40887C19.3045 10.5505 20.1995 11.4456 21.3412 11.8165L21.5729 11.1032L21.8047 10.3899C21.1197 10.1674 20.5827 9.63034 20.3601 8.94535L19.6468 9.17711ZM5.25 21.7087L5.28734 20.9597C3.66345 20.8787 2.895 20.6377 2.37868 20.1214L1.84835 20.6517L1.31802 21.182C2.26231 22.1263 3.54638 22.3747 5.21266 22.4578L5.25 21.7087ZM20.25 21.7501V21.0001H11.25V21.7501V22.5001H20.25V21.7501ZM26.25 21.7087L26.2873 22.4578C27.9536 22.3747 29.2377 22.1263 30.182 21.182L29.6516 20.6517L29.1213 20.1214C28.605 20.6377 27.8366 20.8787 26.2127 20.9597L26.25 21.7087ZM0.75 0.750061V1.50006H13.2V0.750061V6.10352e-05H0.75V0.750061ZM0.791326 17.2501L0.0422557 17.2874C0.125314 18.9537 0.373725 20.2377 1.31802 21.182L1.84835 20.6517L2.37868 20.1214C1.86236 19.6051 1.62134 18.8366 1.5404 17.2127L0.791326 17.2501ZM0.75 6.75006V7.50006H9.75V6.75006V6.00006H0.75V6.75006ZM0.75 11.2501V12.0001H6.75V11.2501V10.5001H0.75V11.2501ZM19.5 3.75006V4.50006H22.2318V3.75006V3.00006H19.5V3.75006ZM28.8354 7.69431L28.175 8.04989L30.0896 11.6056L30.75 11.2501L31.4104 10.8945L29.4957 7.33874L28.8354 7.69431ZM22.2318 3.75006V4.50006C23.3383 4.50006 24.1129 4.50094 24.7234 4.56259C25.317 4.62253 25.6933 4.73532 26.01 4.92451L26.3946 4.28063L26.7792 3.63674C26.2077 3.29537 25.5941 3.14287 24.8741 3.07018C24.171 2.99918 23.3084 3.00006 22.2318 3.00006V3.75006ZM28.8354 7.69431L29.4957 7.33874C28.9853 6.39089 28.5771 5.63093 28.1813 5.04553C27.7759 4.4461 27.3508 3.97811 26.7792 3.63674L26.3946 4.28063L26.01 4.92451C26.3268 5.11371 26.6045 5.39151 26.9387 5.88577C27.2824 6.39405 27.6504 7.07565 28.175 8.04989L28.8354 7.69431Z" fill="currentColor" />
  </svg>
);

const ReplaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 8.5H8.5A4.5 4.5 0 0 0 4 13M4 15.5h11.5A4.5 4.5 0 0 0 20 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 5 20 8.5 16.5 12M7.5 19 4 15.5 7.5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path opacity="0.4" d="M3.64453 21.5696L21.5722 3.64197" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path opacity="0.4" d="M14.4043 25.1701L16.2046 23.3699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path opacity="0.4" d="M18.4414 21.1339L22.0269 17.5483" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.15226 13.1081L13.1137 3.14665C16.2942 -0.0338114 17.8844 -0.0488136 21.0349 3.10165L28.401 10.4677C31.5514 13.6182 31.5364 15.2084 28.3559 18.3889L18.3945 28.3503C15.214 31.5308 13.6238 31.5458 10.4733 28.3954L3.10725 21.0293C-0.0432111 17.8788 -0.0432115 16.3036 3.15226 13.1081Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M0.75 30.75H30.7544" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path opacity="0.4" d="M28.7779 19.6021C27.1538 22.0515 25.6806 24.8175 26.0405 27.7343C26.1905 28.9793 24.8556 29.8492 23.7907 29.2042L17.7342 25.6049C17.5848 25.5162 17.41 25.47 17.2362 25.467C16.4728 25.454 16.1131 24.5501 16.4602 23.87C16.9677 22.8755 17.251 21.7639 17.251 20.5945C17.251 16.3346 13.5612 12.8847 9.00147 12.8847C7.67555 12.8847 6.42803 13.1722 5.31865 13.694C4.84238 13.918 4.26172 13.636 4.26172 13.1097C4.26172 6.28484 10.1864 0.75 17.506 0.75C24.8256 0.75 30.7503 6.28484 30.7503 13.1097C30.7503 15.4942 30.0275 17.7176 28.7779 19.6021Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.2491 20.5941C17.2491 22.379 16.5891 24.029 15.4792 25.334C14.8929 26.0447 14.171 26.6548 13.3494 27.133C10.7737 28.6322 7.64721 29.092 5.08476 30.6138C4.4248 31.0188 3.58484 30.4638 3.67484 29.6988C3.90529 27.8829 2.98483 26.1589 1.97352 24.633C1.19654 23.4607 0.75 22.0767 0.75 20.5941C0.75 17.9541 2.15993 15.6292 4.31981 14.2493C5.65474 13.3793 7.25965 12.8843 8.99955 12.8843C13.5593 12.8843 17.2491 16.3342 17.2491 20.5941Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CRAFT_ITEMS = [
  {
    title: "Authentic Quality",
    role: "Handpicked",
    image: "/images/home/kanjivaram.png",
  },
  {
    title: "Original Handcraft",
    role: "Elampilai weaves",
    image: "/images/home/Bridal Tissue.png",
  },
  {
    title: "Curated Collection",
    role: "Wedding & everyday",
    image: "/images/home/Wedding Collection.png",
  },
  {
    title: "Customer Care",
    role: "Personal styling",
    image: "/images/home/Celebrity Collection.png",
  },
];

export default function AboutPage() {
  return (
    <main className="aq-about-page">
      <div className="aq-breadcrumb-ptb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="aq-breadcrumb-top-heading text-center aq-about-pb-60">
                <div className="pd-breadcrumb-list">
                  <span>
                    <Link href="/">home</Link>
                  </span>
                  <span>/</span>
                  <span>about us</span>
                </div>
                <h2 className="aq-blog-inner-top-title">
                  Best store <br /> Available to Everyone!
                </h2>
                <p>
                  Celebrating Indian heritage through timeless sarees from
                  Elampilai, Salem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-about-banner aq-about-pb-100">
        <div className="container container-1330">
          <div className="row">
            <div className="col-lg-12">
              <div className="aq-about-banner-wrap">
                <Image
                  src="/images/home/About-us.png"
                  alt="Kavya Creation showroom"
                  width={1600}
                  height={700}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-about-feature-style csm-feature-style aq-about-pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="aq-about-feature-heading text-center aq-about-mb-55">
                <h3 className="aq-section-title fs-36 ff-satoshi-med">
                  We are proudly from Elampilai, Salem.
                </h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="aqf-shop-feature-item aq-about-mb-30 text-center">
                <span>
                  <LeafIcon />
                </span>
                <h4>Soft Fabric</h4>
                <p>
                  Silk and cotton weaves chosen for drape, sheen, <br /> and
                  everyday comfort.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="aqf-shop-feature-item aq-about-mb-30 text-center">
                <span>
                  <LeafIcon />
                </span>
                <h4>Lightweight</h4>
                <p>
                  Pieces you can wear through long functions <br /> without
                  feeling heavy.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="aqf-shop-feature-item aq-about-mb-30 text-center">
                <span>
                  <LeafIcon />
                </span>
                <h4>All Day Comfort</h4>
                <p>
                  Traditional craft made to feel easy from the <br /> first
                  drape to the last hour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-about-product-ptb aq-about-pb-80">
        <div className="container container-1330">
          <div className="aq-about-product-wrap aq-about-pb-70">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="aq-about-product-thumb aq-about-mb-30">
                  <Image
                    src="/images/home/About.png"
                    alt="Kavya Creation store interior"
                    width={800}
                    height={640}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="aq-about-product-content aq-about-mb-30">
                  <h3 className="aq-section-title fs-32 ff-satoshi-med aq-about-mb-20">
                    Our Story
                  </h3>
                  <p>
                    We have been curating authentic Indian sarees from
                    Elampilai, Salem — working with skilled weavers to preserve
                    traditional techniques. <br />
                    Every saree tells a story of the artisan who made it, the
                    heritage it carries, and the occasion it will become part
                    of. <br />
                    Visit our showroom at Ashok Nagar, Perumagoundampatty, for
                    personal styling and a wide collection.
                  </p>
                  <div className="aq-about-product-btn">
                    <Link className="aq-btn-black radius-30" href="/shop">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aq-about-product-wrap aq-about-product-border aq-about-pb-90">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="aq-about-product-content aq-about-mb-30">
                  <h3 className="aq-section-title fs-32 ff-satoshi-med aq-about-mb-20">
                    Our Mission
                  </h3>
                  <p>
                    Our mission is to preserve the art of saree weaving while
                    offering elegant, high-quality pieces for every occasion.{" "}
                    <br />
                    We work directly with artisans so you receive authentic
                    work — from traditional handloom to contemporary designer
                    weaves. <br />
                    Whether you need a wedding saree or everyday elegance, we
                    help you find a piece that feels like yours.
                  </p>
                  <div className="aq-about-product-btn">
                    <Link className="aq-btn-black radius-30" href="/shop">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="aq-about-product-thumb aq-about-mb-30">
                  <Image
                    src="/images/home/kanjivaram.png"
                    alt="Kanjivaram wedding sarees"
                    width={800}
                    height={640}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-about-team-style aq-about-pb-70">
        <div className="container container-1330">
          <div className="row">
            <div className="col-lg-12">
              <div className="aq-about-feature-heading text-center aq-about-mb-40">
                <h3 className="aq-section-title fs-36 ff-satoshi-med">Our Craft</h3>
                <p>Authentic weaves, curated with care from Elampilai.</p>
              </div>
            </div>
            {CRAFT_ITEMS.map((item) => (
              <div className="col-lg-3 col-md-6" key={item.title}>
                <div className="aq-about-team-item text-center aq-about-mb-30">
                  <div className="aq-about-team-item-thumb aq-about-mb-20">
                    <Image src={item.image} alt={item.title} width={400} height={480} />
                  </div>
                  <div className="aq-about-team-item-content">
                    <h4 className="aq-about-team-item-title">{item.title}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="aq-about-feature-style grc-feature-style aq-login-page-style">
        <div className="container-fluid gx-0">
          <div className="aqf-shop-feature-wrap d-flex flex-wrap align-items-center">
            <div className="aqf-shop-feature-item d-flex align-items-center aq-about-mb-30">
              <div className="aqf-shop-feature-icon">
                <span>
                  <TruckIcon />
                </span>
              </div>
              <div className="aqf-shop-feature-content">
                <h4>Affordable Shipping</h4>
                <p>Affordable shipping on orders across India</p>
              </div>
            </div>
            <div className="aqf-shop-feature-item d-flex align-items-center aq-about-mb-30">
              <div className="aqf-shop-feature-icon">
                <span>
                  <ReplaceIcon />
                </span>
              </div>
              <div className="aqf-shop-feature-content">
                <h4>Easy Replacement</h4>
                <p>1-day replacement on eligible orders</p>
              </div>
            </div>
            <div className="aqf-shop-feature-item d-flex align-items-center aq-about-mb-30">
              <div className="aqf-shop-feature-icon">
                <span>
                  <CardIcon />
                </span>
              </div>
              <div className="aqf-shop-feature-content">
                <h4>Flexible Payment</h4>
                <p>Pay securely with Razorpay</p>
              </div>
            </div>
            <div className="aqf-shop-feature-item d-flex align-items-center aq-about-mb-30">
              <div className="aqf-shop-feature-icon">
                <span>
                  <ChatIcon />
                </span>
              </div>
              <div className="aqf-shop-feature-content">
                <h4>Support Online</h4>
                <p>Mon–Sat from 10am to 7pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
