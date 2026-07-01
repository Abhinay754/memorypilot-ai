"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, {
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

export default function KnowledgeGraph() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    async function loadGraph() {
      const res = await axios.get("/api/knowledge");

      const profile = res.data;

      const graphNodes: any[] = [
        {
          id: "user",
          position: { x: 250, y: 20 },
          data: { label: "👤 You" },
        },
      ];

      const graphEdges: any[] = [];

      profile.forEach(
        (
          item: { key: string; value: string },
          index: number
        ) => {
          graphNodes.push({
            id: item.key,
            position: {
              x: index * 180,
              y: 180,
            },
            data: {
              label: `${item.key}: ${item.value}`,
            },
          });

          graphEdges.push({
            id: `e${index}`,
            source: "user",
            target: item.key,
          });
        }
      );

      setNodes(graphNodes);
      setEdges(graphEdges);
    }

    loadGraph();
  }, []);

  return (
    <div className="w-full h-[500px] bg-zinc-900 rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}