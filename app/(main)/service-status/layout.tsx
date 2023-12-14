type ServiceStatusLayoutProps = {
  children: React.ReactNode;
};

const ServiceStatusLayout = ({ children }: ServiceStatusLayoutProps) => {
  return <main className="h-full bg-blue-500">{children}</main>;
};

export default ServiceStatusLayout;
