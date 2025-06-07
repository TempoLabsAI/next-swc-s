import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Shield,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Halifax
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Halifax is a trusted name in UK banking, providing innovative
              financial solutions and exceptional customer service for over 160
              years.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>
                Authorised by the Prudential Regulation Authority and regulated
                by the Financial Conduct Authority
              </span>
            </div>
          </div>

          {/* Banking Services Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Banking</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Current Accounts
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Savings Accounts
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Credit Cards
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mortgages
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Centre
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Branch Locator
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Security Centre
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Halifax
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Press Centre
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-white mb-1">
                  Customer Service
                </div>
                <div className="text-gray-300 text-sm">0345 720 3040</div>
                <div className="text-gray-400 text-xs">Available 24/7</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-white mb-1">Email Support</div>
                <div className="text-gray-300 text-sm">
                  support@halifax.co.uk
                </div>
                <div className="text-gray-400 text-xs">
                  Response within 24 hours
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium text-white mb-1">Head Office</div>
                <div className="text-gray-300 text-sm">
                  Halifax, West Yorkshire
                </div>
                <div className="text-gray-400 text-xs">United Kingdom</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="text-gray-400 mb-4 md:mb-0 text-sm">
            © {currentYear} Halifax. Halifax is a division of Bank of Scotland
            plc. Registered in Scotland No. SC327000. Registered Office: The
            Mound, Edinburgh EH1 1YZ.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-800 text-xs text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Cookie Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Accessibility
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Modern Slavery Statement
          </Link>
        </div>
      </div>
    </footer>
  );
}
