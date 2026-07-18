import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="bg-[#F8F5F0] rounded-2xl border border-[#EDD9BC] p-8 text-center my-4">
          <AlertTriangle className="w-10 h-10 text-[#A65E2E] mx-auto mb-3" />
          <h3 className="font-display text-[#4E342E] font-semibold text-lg mb-2">Something went wrong</h3>
          <p className="text-[#8B857C] text-sm mb-4">{this.state.error?.message || "An unexpected error occurred."}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="bg-[#4E342E] text-[#F8F5F0] px-5 py-2 rounded-2xl text-sm font-medium hover:bg-[#A65E2E] transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
