import { Download } from "lucide-react";

const BusServiceGuide = () => {
  const SERVICE_GUIDE_LINKS = [
    {
      title: "Bronx Bus Service Guide",
      href: "/images/maps/bus/service-guide/service-guide-bx.pdf",
    },
    {
      title: "Brooklyn Bus Service Guide",
      href: "/images/maps/bus/service-guide/service-guide-bk.pdf",
    },
    {
      title: "Manhattan Bus Service Guide",
      href: "/images/maps/bus/service-guide/service-guide-bk.pdf",
    },
    {
      title: "Queens Bus Service Guide",
      href: "/images/maps/bus/service-guide/service-guide-q.pdf",
    },
    {
      title: "Staten Island Bus Service Guide",
      href: "/images/maps/bus/service-guide/service-guide-si.pdf",
    },
    {
      title: "Staten Island Expres Bus Service Guide",
      href: "/images/maps/bus/service-guide/service-guide-sie.pdf",
    },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-4xl font-bold">Borough Bus Service Guide</h2>

      <ul className="mt-8 grid gap-y-5 md:grid-cols-2">
        {SERVICE_GUIDE_LINKS.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              download={link.title}
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
