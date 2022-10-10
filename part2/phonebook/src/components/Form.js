import { Button } from './Button';

export const Form = ({ onSubmitFunction, children }) => {
  return (
    <form onSubmit={onSubmitFunction}>
      {children}
      <div>
        <Button type="submit" text="add" />
      </div>
    </form>
  );
};
