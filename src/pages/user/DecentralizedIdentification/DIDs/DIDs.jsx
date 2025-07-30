import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import Step1 from "../../../../components/DIDs/Step1";
import Step2 from "../../../../components/DIDs/Step2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaPlus } from "react-icons/fa";
import { Stepper } from "@/components/ui/stepper";
import { useIdentityProfile } from "@/hooks/useIdentityProfile";

const steps = [
  { title: "Step 1", description: "Import your DID from Digital Wallet" },
  { title: "Step 2", description: "Check your email" },
  { title: "Step 3", description: "Confirm and finish" },
];
const organizations = [
  {
    name: "Unnamed",
    ecosystem: "",
    did: "did:key:z6MkiyVk64CFFh938dh87DRmWYGcHwwNVG4DJN39T",
    issued: 0,
    updated: "7/29/2025",
  },
  {
    name: "Attacker Backend",
    ecosystem: "",
    did: "did:cheqd:testnet:3d8707e1-2425-4be9-ba41-0ad0c8a06f93",
    issued: 2,
    updated: "7/22/2025",
  },
  {
    name: "Đại học Quốc gia Thành phố",
    ecosystem: "",
    did: "did:cheqd:testnet:7c331522-98fd-4794-9327-e61d945419bc",
    issued: 1,
    updated: "7/22/2025",
  },
];

export default function DIDs() {
  const [currentStep, setCurrentStep] = useState(0);
  const { createIdentityProfile } = useIdentityProfile();

  const handdleCreateProfile = async (data) => {
    createIdentityProfile.mutate(data)
  }
  return (
    <div className="flex flex-col gap-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-x-1">
          <h1 className="text-2xl font-bold">
            Your Decentralized Identification (DIDs)
          </h1>
          <span className="cursor-pointer text-sm text-blue-400 underline hover:text-blue-600">
            Read more
          </span>
        </div>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <div
                className={`ocus:ring-0 cursor-pointer rounded-3xl border-none bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-0`}
              >
                <FaPlus className="mr-2 inline" />
                Import you DID from Digital Wallet
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Import your DID from Digital Wallet
                </DialogDescription>
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </DialogHeader>
              <div className="px-8 py-4">
                {currentStep === 0 && <Step1 />}
                {currentStep === 1 && <Step2 />}
              </div>
              <DialogFooter className={`flex w-full`}>
                <div className="flex w-full items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    className={`cursor-pointer`}
                  >
                    Previous
                  </Button>

                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={currentStep === steps.length - 1}
                    className={`cursor-pointer bg-indigo-700`}
                  >
                   Import DID
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className="rounded-lg border bg-white p-4 shadow-md">
        <Table
          className={"overflow-hidden rounded-lg border border-gray-400 p-2"}
        >
          <TableHeader>
            <TableRow>
              <TableHead className={`text-muted-foreground px-4 font-semibold`}>
                Public name
              </TableHead>
              <TableHead className={`text-muted-foreground px-4 font-semibold`}>
                Ecosystems
              </TableHead>
              <TableHead className={`text-muted-foreground px-4 font-semibold`}>
                DID
              </TableHead>
              <TableHead
                className={`text-muted-foreground px-4 text-end font-semibold`}
              >
                Credentials Issued
              </TableHead>
              <TableHead className={`text-muted-foreground px-4 font-semibold`}>
                Last updated
              </TableHead>
              <TableHead
                className={`text-muted-foreground px-4 font-semibold`}
              ></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org, idx) => (
              <TableRow key={idx}>
                <TableCell className={`text-muted-text px-4`}>
                  {org.name}
                </TableCell>
                <TableCell className={`text-muted-text px-4`}>
                  {org.ecosystem}
                </TableCell>
                <TableCell className={`text-muted-foreground px-4`}>
                  {org.did}
                </TableCell>
                <TableCell className="text-muted-foreground px-4 text-end">
                  {org.issued}
                </TableCell>
                <TableCell className={`text-muted-text px-4`}>
                  {org.updated}
                </TableCell>
                <TableCell className={`text-muted-text px-4`}>
                  <MoreVertical className="text-muted-foreground h-5 w-5 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex justify-end text-sm">
        Total Rows: {organizations.length}
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Learn more about{" "}
        <a
          href="https://docs.cheqd.io/identity/profiles/organization"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          organization profiles
        </a>
      </p>
    </div>
  );
}




