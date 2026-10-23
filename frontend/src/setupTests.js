// 1. Tell React 18 this is a testing environment to reduce act() warnings
global.IS_REACT_ACT_ENVIRONMENT = true;

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    const message = args[0]?.toString() || "";

    // 2. Filter out the "act()" warning
    if (message.includes("not wrapped in act")) {
      return;
    }

    // 3. Filter out the specific "Invalid Data" error from your component
    if (JSON.stringify(args).includes("Invalid Data")) {
      return;
    }

    // Allow all other actual errors to show up
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});