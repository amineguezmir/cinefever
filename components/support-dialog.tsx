"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function SupportDialog({
  open,
  onOpenChange,
  user,
}: SupportDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = {
      issueType,
      description,
      userEmail: user ? user.email : email,
      userName: user ? user.name : "Anonymous",
    };

    console.log("Sending message:", message);

    emailjs
      .send("service_0kowirb", "template_0yp41sr", message, "qQuwpYi7kpWbZRcry")
      .then(
        () => {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            onOpenChange(false);
            setEmail("");
            setIssueType("");
            setDescription("");
          }, 2000);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            {user ? `Hi ${user.name}!` : "Need Help?"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Submit your issue and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type" className="text-zinc-300">
                Issue Type
              </Label>
              <Select value={issueType} onValueChange={setIssueType} required>
                <SelectTrigger
                  id="issue-type"
                  className="bg-zinc-800 border-zinc-700 text-white"
                >
                  <SelectValue placeholder="Select the type of issue" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="technical">Technical Problem</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="content">Content Related</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your issue in detail..."
                className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                required
              />
            </div>

            {!user && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              Submit Issue
            </Button>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-white font-medium">
              Thank you for your feedback!
            </p>
            <p className="text-zinc-400 text-sm text-center">
              We'll review your submission and get back to you{" "}
              {user ? `at ${user.email}` : `at ${email}`} .
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
