import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../libs/utils/api";

const SigninPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCode(value);
  };

  const handleClickButton = async () => {
    setIsLoading(true);
    const signinResult = await api
      .post<{ result: boolean; token: string }>("/user/signin", { code })
      .then((res) => res.data);

    if (signinResult.result) {
      localStorage.setItem("token", signinResult.token);
      localStorage.setItem("user", code);
      navigate("/");
    } else {
      alert("코드를 다시 확인해주세요.");
    }
    setIsLoading(false);
  };

  const handleKeyDownInputAndButton = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" || e.code === "Enter") {
      return handleClickButton();
    }
  };

  return (
    <div className="signin-form-wrapper">
      <input
        className="signin-form-input"
        placeholder="Code"
        disabled={isLoading}
        onKeyDown={handleKeyDownInputAndButton}
        onChange={handleChangeInput}
      />
      <div
        tabIndex={0}
        onKeyDown={handleKeyDownInputAndButton}
        className="signin-form-submit"
        onClick={handleClickButton}
      >
        Enter
      </div>
    </div>
  );
};

export default SigninPage;
