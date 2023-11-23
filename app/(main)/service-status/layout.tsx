type ServiceStatusLayoutProps = {
  children: React.ReactNode;
};

const ServiceStatusLayout = ({ children }: ServiceStatusLayoutProps) => {
  return <div className="bg-blue-500 h-full">{children}</div>;
};

export default ServiceStatusLayout;
