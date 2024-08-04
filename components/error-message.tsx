type TProps = {
  message: string;
};

export const ErrorMessage = ({ message }: TProps) => {
  return <div className="mt-2 text-[#b91c1c]">{message}</div>;
};
