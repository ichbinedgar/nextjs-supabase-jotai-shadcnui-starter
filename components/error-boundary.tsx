// components/ErrorBoundary.tsx
"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can log the error to an error reporting service here
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError && this.state.error) {
			return (
				<div className="p-4 bg-red-100 text-red-700 rounded">
					<h2>Error</h2>
					<p>
            {this.state.error.message}
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
