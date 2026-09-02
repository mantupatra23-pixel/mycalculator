"use client";

import React from "react";
import { BrokerageCalculatorRenderer } from "./BrokerageCalculatorRenderer";

export function BrokerageRenderer({ toolSlug }: { toolSlug: string }) {
  return <BrokerageCalculatorRenderer toolSlug={toolSlug} />;
}

export default BrokerageRenderer;
