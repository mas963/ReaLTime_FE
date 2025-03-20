import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PlanProps {
  title: string;
  popular: boolean;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Free",
    popular: false,
    price: 0,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Start Free Tial",
    benefitList: [
      "1 team member",
      "1 GB storage",
      "Upto 2 pages",
      "Community support",
      "AI assistance",
    ],
  },
  {
    title: "Preium",
    popular: true,
    price: 20,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Get started",
    benefitList: [
      "4 team member",
      "8 GB storage",
      "Upto 6 pages",
      "Priority support",
      "AI assistance",
    ],
  },
  {
    title: "Enterprise",
    popular: false,
    price: 80,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Contact Us",
    benefitList: [
      "10 team member",
      "20 GB storage",
      "Upto 10 pages",
      "Phone & email support",
      "AI assistance",
    ],
  },
];

export const PricintSection = () => {
  return (
    <section className="@container py-24 sm:py-32 lg:max-w-screen-xl mx-auto">
      <h2 className="text-ls text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Get unlimitted access
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Lorem ipsum dolor sit amet consectetur adipisicing reiciendis.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(({ title, popular, price, description, buttonText, benefitList }) => (
          <Card
            key={title}
            className={
              popular ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="pb-2">{title}</CardTitle>

              <CardDescription className="pb-4">
                {description}
              </CardDescription>

              <div>
                <span className="text-3xl font-bold">${price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>
            </CardHeader>

            <CardContent className="flex">
              <div className="space-y-4">
                {benefitList.map((benefit) => (
                  <span key={benefit} className="flex">
                    <Check className="text-primary mr-2" />
                    <h3>{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant={
                  popular ? "default" : "secondary"
                }
                className="w-full"
              >
                {buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}