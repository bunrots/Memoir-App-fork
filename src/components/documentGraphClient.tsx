"use client";

import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

// Define types for our graph data
type GraphNode = {
  id: string;
  name: string;
  val: number;
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

const DocumentGraphClient = () => {
  const { theme } = useTheme() || "dark";
  const isDarkMode = theme === "dark";
  const graphBackgroundColor = isDarkMode
    ? "rgb(0, 0, 0, 0)"
    : "rgb(255, 255, 255, 0)";

  const documents = useQuery(api.documents.getDocuments);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    if (documents) {
      const nodes: GraphNode[] = documents.map((doc) => ({
        id: doc._id,
        name: doc.title,
        val: 1,
      }));

      const links: GraphLink[] = documents.reduce((acc: GraphLink[], doc) => {
        if (doc.parentDocument) {
          acc.push({
            source: doc.parentDocument,
            target: doc._id,
          });
        }
        return acc;
      }, []);

      setGraphData({ nodes, links });
    }
  }, [documents]);

  return (
    <ForceGraph3D
      graphData={graphData}
      nodeLabel="name"
      nodeAutoColorBy="group"
      linkDirectionalParticles={2}
      backgroundColor={graphBackgroundColor}
      onNodeClick={() => {
        // redirect("/documents/" + );
      }} //redirect to that page
      nodeColor={() => "#8B5CF6"}
      linkWidth={1.5}
      width={700}
      height={700}
    />
  );
};

export default DocumentGraphClient;
