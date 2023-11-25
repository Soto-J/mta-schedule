type ServiceStatusLayoutProps = {
  children: React.ReactNode;
};

const ServiceStatusLayout = ({ children }: ServiceStatusLayoutProps) => {
  return <div className="h-full bg-blue-500">{children}</div>;
};

export default ServiceStatusLayout;
