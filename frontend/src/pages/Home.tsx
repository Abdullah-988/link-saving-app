import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../actions/Categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MdOutlinePerson } from "react-icons/md";
import Category from "@/components/Category";
import { CreateButton } from "@/components/Category/CreateButton";

export default function Home() {
  const {
    status,
    isLoading,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="p-8">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-semibold mb-8">Links</h1>
        <div className="flex gap-2">
          <Button className="p-0">
            <Link className="flex justify-center items-center px-4 py-2" to="/account">
              <MdOutlinePerson className="mr-2 h-4 w-4" />
              Account
            </Link>
          </Button>
        </div>
      </div>
      {status == "error" && <h1>{JSON.stringify(error)}</h1>}
      <div className="md:hidden mb-2">
        <CreateButton />
      </div>
      <div className="flex gap-2">
        {isLoading && (
          <div className="p-4 border-2 border-indigo-800/20 border-t-indigo-800 animate-spin rounded-full" />
        )}
        {status == "success" && categories.length != 0 && (
          <Tabs defaultValue="account" className="w-full md:w-auto md:min-w-[450.88px]">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id.toString()}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id.toString()}>
                <Category id={category.id} name={category.name} />
              </TabsContent>
            ))}
          </Tabs>
        )}
        <div className="hidden md:block">
          <CreateButton />
        </div>
      </div>
    </div>
  );
}
