type SchedulesLayoutProps = {
  children: React.ReactNode;
};

const SchedulesLayout = ({ children }: SchedulesLayoutProps) => {
  return (
    <main>
      <h2 className="mb-4 text-3xl font-bold">Schedules</h2>
      {children}
    </main>
  );
};

export default SchedulesLayout;
