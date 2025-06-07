"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { SubmitButton } from "@/components/submit-button";
import { updatePhoneNumberAction } from "@/app/actions";
import { createClient } from "../../../supabase/client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCard,
  DollarSign,
  Gift,
  Home,
  History,
  User,
  Plus,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

interface UserData {
  id: string;
  name: string | null;
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
}

interface Transaction {
  id: string;
  type: "Deposit" | "Withdrawal";
  date: string;
  amount: number;
  status: "Completed" | "Pending";
  description: string;
}

interface CreditCard {
  id: string;
  type: "Credit" | "Debit";
  lastFour: string;
  expiryDate: string;
  cardholderName: string;
}

interface Loan {
  id: string;
  type: string;
  amount: number;
  status: "Active" | "Paid Off" | "Pending";
  monthlyPayment: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Dummy data
  const bankBalance = 15420.5;

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "Deposit",
      date: "2024-03-20",
      amount: 2500.0,
      status: "Completed",
      description: "Salary Deposit",
    },
    {
      id: "2",
      type: "Withdrawal",
      date: "2024-03-19",
      amount: 150.0,
      status: "Completed",
      description: "ATM Withdrawal",
    },
    {
      id: "3",
      type: "Withdrawal",
      date: "2024-03-18",
      amount: 89.99,
      status: "Pending",
      description: "Online Purchase",
    },
    {
      id: "4",
      type: "Deposit",
      date: "2024-03-15",
      amount: 1200.0,
      status: "Completed",
      description: "Freelance Payment",
    },
  ];

  const creditCards: CreditCard[] = [
    {
      id: "1",
      type: "Credit",
      lastFour: "4532",
      expiryDate: "12/26",
      cardholderName: userData?.full_name || userData?.name || "Cardholder",
    },
    {
      id: "2",
      type: "Debit",
      lastFour: "8901",
      expiryDate: "08/25",
      cardholderName: userData?.full_name || userData?.name || "Cardholder",
    },
  ];

  const loans: Loan[] = [
    {
      id: "1",
      type: "Personal Loan",
      amount: 25000,
      status: "Active",
      monthlyPayment: 450,
    },
    {
      id: "2",
      type: "Car Loan",
      amount: 18000,
      status: "Active",
      monthlyPayment: 320,
    },
  ];

  const rewardPoints = 12450;
  const rewardTier = "Gold";
  const tierProgress = 75;

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/sign-in";
        return;
      }

      setUser(user);

      // Fetch user data from users table
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUserData(userData);
      }

      setIsLoading(false);
    };

    getUser();
  }, []);

  const showUnavailableFeature = () => {
    toast({
      title: "Feature Unavailable",
      description: "This feature is currently unavailable, contact support.",
      variant: "default",
    });
  };

  const handleEditProfile = async (formData: FormData) => {
    const result = await updatePhoneNumberAction(formData);

    // Refresh user data
    const { data: updatedUserData } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (updatedUserData) {
      setUserData(updatedUserData);
    }

    setIsEditProfileOpen(false);
  };

  if (isLoading) {
    return (
      <>
        <DashboardNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userData?.name || userData?.full_name || "User"}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your Halifax banking experience
            </p>
          </div>

          <Tabs defaultValue="homepage" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="homepage" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Homepage
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                My History
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                My Profile
              </TabsTrigger>
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                My Cards
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                My Rewards
              </TabsTrigger>
              <TabsTrigger value="loans" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Loans
              </TabsTrigger>
            </TabsList>

            {/* Homepage Tab */}
            <TabsContent value="homepage" className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Current Balance</CardTitle>
                  <CardDescription className="text-blue-100">
                    Your main account balance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    £
                    {bankBalance.toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={showUnavailableFeature}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <ArrowUpIcon className="h-6 w-6" />
                  Transfer Money
                </Button>
                <Button
                  onClick={showUnavailableFeature}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <DollarSign className="h-6 w-6" />
                  Pay Bills
                </Button>
                <Button
                  onClick={showUnavailableFeature}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  <ArrowDownIcon className="h-6 w-6" />
                  Deposit Cheque
                </Button>
                <Button
                  onClick={showUnavailableFeature}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700"
                >
                  <CreditCard className="h-6 w-6" />
                  Manage Cards
                </Button>
              </div>
            </TabsContent>

            {/* My History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    Your recent banking transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {transaction.type === "Deposit" ? (
                                <ArrowUpIcon className="h-4 w-4 text-green-600" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4 text-red-600" />
                              )}
                              {transaction.type}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString(
                              "en-GB",
                            )}
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "Deposit"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {transaction.type === "Deposit" ? "+" : "-"}£
                            {transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "Completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Full Name
                      </Label>
                      <p className="text-lg">
                        {userData?.full_name ||
                          userData?.name ||
                          "Not provided"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Email
                      </Label>
                      <p className="text-lg">
                        {userData?.email || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Phone Number
                      </Label>
                      <p className="text-lg">
                        {userData?.phone_number || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <Dialog
                    open={isEditProfileOpen}
                    onOpenChange={setIsEditProfileOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="mt-4">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your phone number
                        </DialogDescription>
                      </DialogHeader>
                      <form action={handleEditProfile} className="space-y-4">
                        <div>
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            placeholder="+44 7XXX XXXXXX"
                            defaultValue={userData?.phone_number || ""}
                            required
                          />
                        </div>
                        <SubmitButton className="w-full">
                          Update Phone Number
                        </SubmitButton>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Cards Tab */}
            <TabsContent value="cards" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">My Cards</h2>
                  <p className="text-gray-600">
                    Manage your credit and debit cards
                  </p>
                </div>
                <Button
                  onClick={showUnavailableFeature}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Card
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creditCards.map((card) => (
                  <Card
                    key={card.id}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 text-white"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {card.type} Card
                        </CardTitle>
                        <CreditCard className="h-6 w-6" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-xl font-mono tracking-wider">
                          **** **** **** {card.lastFour}
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xs text-gray-300">CARDHOLDER</p>
                            <p className="text-sm">{card.cardholderName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-300">EXPIRES</p>
                            <p className="text-sm">{card.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Rewards Tab */}
            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards Program</CardTitle>
                  <CardDescription>
                    Track your rewards and tier status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">
                      {rewardPoints.toLocaleString()}
                    </div>
                    <p className="text-gray-600">Reward Points</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Tier</span>
                      <Badge variant="default" className="bg-yellow-500">
                        {rewardTier}
                      </Badge>
                    </div>
                    <Progress value={tierProgress} className="h-3" />
                    <p className="text-xs text-gray-600">
                      {tierProgress}% to Platinum tier
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="text-center p-4">
                      <CardContent className="p-0">
                        <Gift className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold">Cashback</h3>
                        <p className="text-sm text-gray-600">
                          2% on all purchases
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="text-center p-4">
                      <CardContent className="p-0">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <h3 className="font-semibold">Bonus Points</h3>
                        <p className="text-sm text-gray-600">
                          5x points on dining
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="text-center p-4">
                      <CardContent className="p-0">
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold">No Annual Fee</h3>
                        <p className="text-sm text-gray-600">
                          Free for Gold members
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Loans Tab */}
            <TabsContent value="loans" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">My Loans</h2>
                  <p className="text-gray-600">Manage your existing loans</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Request Loan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Loan Request</DialogTitle>
                      <DialogDescription>
                        Loan requests are currently unavailable.
                      </DialogDescription>
                    </DialogHeader>
                    <p className="text-center py-4">
                      Please contact our support team for assistance with loan
                      applications.
                    </p>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {loans.map((loan) => (
                  <Card key={loan.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{loan.type}</CardTitle>
                        <Badge
                          variant={
                            loan.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {loan.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Loan Amount</p>
                          <p className="text-xl font-semibold">
                            £{loan.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Monthly Payment
                          </p>
                          <p className="text-xl font-semibold">
                            £{loan.monthlyPayment}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className="text-xl font-semibold">{loan.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Toaster />
    </>
  );
}
