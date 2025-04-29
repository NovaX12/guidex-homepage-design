"use client"
import { CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type StatusStep = {
  id: string
  label: string
  status: "completed" | "current" | "upcoming" | "warning"
}

interface StatusBarProps {
  steps: StatusStep[]
  className?: string
}

export default function StatusBar({ steps, className }: StatusBarProps) {
  return (
    <div className={cn("w-full py-4 px-4 bg-white shadow-sm", className)}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Your Migration Progress</h3>
          <span className="text-xs text-gray-500">Last updated: Today</span>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>

          {/* Completed progress */}
          <div
            className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-500"
            style={{
              width: `${(steps.filter((step) => step.status === "completed").length / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {/* Steps */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className="relative z-10">
                  {step.status === "completed" && (
                    <CheckCircle2 className="w-10 h-10 text-green-500 bg-white rounded-full p-1" />
                  )}
                  {step.status === "current" && (
                    <Circle className="w-10 h-10 text-green-500 bg-white rounded-full p-1 fill-green-100 stroke-2" />
                  )}
                  {step.status === "upcoming" && (
                    <Circle className="w-10 h-10 text-gray-300 bg-white rounded-full p-1" />
                  )}
                  {step.status === "warning" && (
                    <AlertCircle className="w-10 h-10 text-amber-500 bg-white rounded-full p-1" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium text-center max-w-[80px]",
                    step.status === "completed" && "text-green-600",
                    step.status === "current" && "text-green-600",
                    step.status === "upcoming" && "text-gray-500",
                    step.status === "warning" && "text-amber-600",
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

