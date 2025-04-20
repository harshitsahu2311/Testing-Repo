import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import ProtectedLayout from "../../../layout/ProtectedLayout";

const NotFound = () => {
  return (
    <ProtectedLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-6 p-8">
          <div className="space-y-2">
            <h1 className="text-9xl font-bold text-gray-900">404</h1>
            <p className="text-2xl font-semibold text-gray-700">
              Page not found
            </p>
            <p className="text-gray-500 max-w-lg mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Please check the URL or navigate back home.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors bg-secondary]"
          >
            <ArrowBackIcon className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default NotFound;
