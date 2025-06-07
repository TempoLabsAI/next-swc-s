import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Shield,
  CreditCard,
  TrendingUp,
  Users,
  Clock,
  Award,
  Smartphone,
  CheckCircle,
  Star,
  Globe,
  Lock,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">FCA Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Award Winning Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">2M+ Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Banking Made Simple
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience modern banking with Halifax's award-winning digital
              platform. Manage your money with confidence and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile First",
                description:
                  "Bank on the go with our award-winning mobile app. Available 24/7 wherever you are.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Bank-Grade Security",
                description:
                  "Your money is protected with military-grade encryption and fraud monitoring.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Smart Insights",
                description:
                  "Get personalized insights and budgeting tools to help you reach your financial goals.",
              },
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Instant Payments",
                description:
                  "Send money instantly to friends and family with our fast payment system.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "24/7 Support",
                description:
                  "Get help when you need it with our round-the-clock customer support team.",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Access",
                description:
                  "Access your account from anywhere in the world with no hidden fees.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Choose Your Account
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect account for your lifestyle with competitive rates
              and no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Reward Current Account",
                description: "Earn cashback on your everyday spending",
                features: [
                  "Up to 3% cashback",
                  "No monthly fees",
                  "Contactless payments",
                  "Mobile banking",
                ],
                cta: "Open Account",
                popular: false,
              },
              {
                name: "Ultimate Reward Account",
                description: "Premium banking with exclusive benefits",
                features: [
                  "Up to 5% cashback",
                  "Travel insurance included",
                  "Priority customer service",
                  "Exclusive offers",
                ],
                cta: "Get Started",
                popular: true,
              },
              {
                clarity: "Clarity Account",
                name: "Student Account",
                description: "Perfect for students with flexible features",
                features: [
                  "£0 overdraft fees",
                  "Student discounts",
                  "Budgeting tools",
                  "24/7 support",
                ],
                cta: "Apply Now",
                popular: false,
              },
            ].map((product, index) => (
              <div
                key={index}
                className={`p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative ${
                  product.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    product.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {product.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join millions who trust Halifax with their financial future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                content:
                  "Halifax has transformed how I manage my business finances. The mobile app is incredibly intuitive and the customer service is outstanding.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                content:
                  "The security features give me peace of mind, and the cashback rewards are fantastic. I've saved hundreds this year alone.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                role: "University Student",
                content:
                  "As a student, the overdraft facilities and budgeting tools have been a lifesaver. Halifax really understands what students need.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">2M+</div>
              <div className="text-blue-100 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">£50B+</div>
              <div className="text-blue-100 text-lg">Assets Protected</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100 text-lg">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-lg">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Banking Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join Halifax today and experience the future of banking. Open your
            account in minutes and start enjoying the benefits immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Open Account Today
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Access Dashboard
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Account opening subject to eligibility and approval. Terms and
            conditions apply.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
