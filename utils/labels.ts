// constants/labels.ts

export const Labels = {
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    forgotPassword: "Forgot Password",
    redirectMessage: "Please sign in to continue.",
  },
  protectedPage: {
    infoMessage: "This is a protected page that you can only see as an authenticated user.",
    userDetailsTitle: "Your User Details",
    nextStepsTitle: "Next Steps",
    loading: "Loading...",
    errorPrefix: "Error:",
    somethingWentWrong: "Something went wrong.",
    errorFallback: "An unexpected error occurred.",
  },
  themeSwitcher: {
    light: "Light",
    dark: "Dark",
    system: "System",
    toggleTheme: "Toggle Theme",
  },
  errorBoundary: {
    title: "Something went wrong.",
    description: "Please try again later or contact support if the problem persists.",
  },
  // Add more labels as needed
} as const;
