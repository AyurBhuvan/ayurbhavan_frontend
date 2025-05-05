import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";

import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginType } from "@/schemas/authSchema";
import { useLoginUser } from "@/hooks/useAuth";

import { Spinner } from "@nextui-org/spinner";


const LogIn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { mutate: login, isPending } = useLoginUser();


  const { register, handleSubmit } = useForm<LoginType>();

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function onLogInPress(values: LoginType) {
    // console.log(values);


    login(values);
    
    


  }


  return (
    <>
      <div className="h-screen grid place-items-center">
        <Card className="w-[400px]">
          <CardHeader>Login</CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onLogInPress)}>
              <div className="space-y-4">
                <Input
                  placeholder="Enter your email address"
                  variant="faded"
                  color="success"
                  {...register("email")}
                />

                <Input
                  variant="faded"
                  placeholder="Enter your password"
                  color="success"
                  {...register("password")}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />

                <Button color="success" type="submit" fullWidth>
                  {isPending ? <div className="flex items-center gap-2">
                    <Spinner color="current" />
                    <p className="">Logging in</p>
                  </div> : "Log In"}
                </Button>
              </div>
            </form>
          </CardBody>

          <Divider />

          <CardFooter className="flex justify-center">
            <div className="flex justify-center items-center gap-2">
              <p className="">Don't have an account</p>
              <Link href="/#" className="text-blue-600">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LogIn;
