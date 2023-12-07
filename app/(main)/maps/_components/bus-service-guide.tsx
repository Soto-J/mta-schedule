import { Download } from "lucide-react";

const BusServiceGuide = () => {
  const SERVICE_GUIDE_LINKS = [
    { title: "Bronx Bus Service Guide", href: "" },
    { title: "Brooklyn Bus Service Guide", href: "" },
    { title: "Manhattan Bus Service Guide", href: "" },
    { title: "Queens Bus Service Guide", href: "" },
    { title: "Staten Island Bus Service Guide", href: "" },
    { title: "Staten Island Expres Bus Service Guide", href: "" },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-4xl font-bold">Borough Bus Service Guide</h2>

      <ul className="mt-8 grid md:grid-cols-2 gap-y-5">
        {SERVICE_GUIDE_LINKS.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              className="
                flex 
                max-w-fit
                items-center
                gap-3
                hover:text-sky-500
              "
            >
              <span className="">{link.title}</span>
              <Download size={20} className="" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusServiceGuide;
