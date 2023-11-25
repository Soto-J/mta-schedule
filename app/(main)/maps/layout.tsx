type MapsLayoutProps = {
  children: React.ReactNode;
};

const MapsLayout = ({ children }: MapsLayoutProps) => {
  return (
    <main>
      <h2 className="text-center text-6xl font-bold">Maps</h2>
      {children}
    </main>
  );
};

export default MapsLayout;
