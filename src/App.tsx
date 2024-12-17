import { RegisterForm } from "./components/Forms/RegisterForm";
import { Header } from "./components/UI/Header";

function App() {

  return (
    <>
      <Header />
      <main className="max-w-[620px] mx-auto">
        <RegisterForm />
      </main>
    </>
  );
}

export default App;
