import { Header } from "./components/Header";
import { AssessmentPage } from "./components/AssessmentPage";

export default function AssessmentApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AssessmentPage />
    </div>
  );
}