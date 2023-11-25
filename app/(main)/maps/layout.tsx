type MapsLayoutProps = {
  children: React.ReactNode;
};

const MapsLayout = ({ children }: MapsLayoutProps) => {
  return (
    <main>
      <h2 className="font-bold text-6xl text-center">Maps</h2>
      {children}
    </main>
  );
};

export default MapsLayout;
