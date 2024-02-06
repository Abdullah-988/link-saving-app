import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getLinks } from "../actions/Links";
import { EditButton } from "./Category/EditButton";
import DeleteButton from "./Category/DeleteButton";
import { CreateButton } from "./Link/CreateButton";
import { EditButton as EditLinkButton } from "./Link/EditButton";
import { DeleteButton as DeleteLinkButton } from "./Link/DeleteButton";

export default function Category({ id, name }: { id: number; name: string }) {
  const {
    status,
    isLoading,
    error,
    data: links,
  } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks({ categoryId: id }),
  });

  return (
    <div className="w-full">
      {status == "error" && <h1>{JSON.stringify(error)}</h1>}
      {isLoading && (
        <div className="p-4 w-8 h-8 border-2 border-indigo-800/20 border-t-indigo-800 animate-spin rounded-full" />
      )}
      {status == "success" && (
        <div className="flex flex-wrap gap-2 mb-2">
          <CreateButton categoryId={id} />
          <EditButton categoryId={id} defaultName={name} />
          <DeleteButton categoryId={id} />
        </div>
      )}
      <div className="flex flex-col gap-4 w-full">
        {status == "success" &&
          links?.map((link) => (
            <div className="w-full p-4 rounded-lg border border-slate-200" key={link.id}>
              <Link
                to={link.link}
                target="_blank"
                className="font-semibold underline text-lg"
              >
                {link.link}
              </Link>
              <p className="mt-2">{link.description}</p>
              <div className="flex gap-2 mt-2 w-full">
                <EditLinkButton
                  linkId={link.id}
                  defaultLink={link.link}
                  defaultDescription={link.description}
                />
                <DeleteLinkButton linkId={link.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
