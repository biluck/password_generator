import "../../App.css";

type InputFieldProps = {
  label: string;
  children: React.ReactNode;
}

function InputField({ label, children }: InputFieldProps) {
  return <div className="w-full flex flex-col gap-4">
    <p className="text-md text-gray-500">{label}</p>
    {children}
  </div>;
}

export default InputField;

