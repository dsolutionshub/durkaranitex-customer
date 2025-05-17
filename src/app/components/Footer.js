import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="row">
              <div className="col-md-6">
                <h3 className="footer-heading mb-4">Top Categories</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link href="#">Semi-silk</Link>
                  </li>
                  <li>
                    <Link href="#">Kubera Pattu</Link>
                  </li>
                  <li>
                    <Link href="#">Silk Cotton</Link>
                  </li>
                  <li>
                    <Link href="#">Banarasi Sarees</Link>
                  </li>
                  <li>
                    <Link href="#">Tissue Silk</Link>
                  </li>
                  <li>
                    <Link href="#">Jamdani Sarees</Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <h3 className="footer-heading mb-4">Quick Links</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link href="#">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Contacts</Link>
                  </li>
                  <li>
                    <Link href="#">Wishlist</Link>
                  </li>
                  <li>
                    <Link href="#">Checkout</Link>
                  </li>
                  <li>
                    <Link href="#">My Cart</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className=" mb-5">
              <h3 className="footer-heading mb-4">Social Links</h3>
              <ul className="list-unstyled">
                <li>
                  <Link href="https://www.facebook.com" target="_blank">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com" target="_blank">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.twitter.com" target="_blank">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com" target="_blank">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://www.youtube.com" target="_blank">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="block-5 mb-5">
              <h3 className="footer-heading mb-4">Contact Info</h3>
              <ul className="list-unstyled">
                <li className="address">
                  6/380 ASHOK NAGAR, PERUMAGOUNDAM PATTI, ELAMPILLAI, Salem,
                  Tamil Nadu-637502.
                </li>
                <li className="phone">
                  <Link href="tel:+9489607841">9489607841</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center w-100 mt-10">
          <p className="text-muted">
            Copyright &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
