export const Header = () => (
  <header className="text-gray-100 bg-gray-900 body-font shadow w-full">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row font-black items-center">
      FmAssistant
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  </header>
);