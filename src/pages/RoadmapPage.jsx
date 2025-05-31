import { authFetch } from '../utils/authFetch';
import { useParams } from "react-router-dom";
import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import RoadmapNode from '../components/RoadmapNode';
import DetailsPanel from '../components/DetailsPanel';
import { useToast } from '../hooks/use-toast';
import { Fetch } from '../utils/fetch';

const nodeTypes = {
  roadmap: RoadmapNode,
};


const RoadmapPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { id } = useParams();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isEdgeDetailsPanelOpen, setIsEdgeDetailsPanelOpen] = useState(false);
  const [roadmapTitle, setRoadmapTitle] = useState(localStorage.getItem('currentRoadmapTitle') || 'My Roadmap');
  const [roadmapDescription, setRoadmapDescription] = useState(localStorage.getItem('currentRoadmapDescription') || 'A new roadmap');
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSpecificRoadmap = async () => {
      try {
        const res = await Fetch(`/api/v1/roadmap/${id}`);
        const body = await res.json();
        setNodes(body.nodes);
        setEdges(body.edges);
        // Wait for the nodes to be rendered before fitting view
        //reactFlowInstance.fitView({ padding: 0.2 }); 

      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
      }
    };

    fetchSpecificRoadmap();
  }, [id]); // Include `id` in dependency array




  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    setIsDetailsPanelOpen(true);
    setIsEdgeDetailsPanelOpen(false);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setIsDetailsPanelOpen(false);
    setIsEdgeDetailsPanelOpen(false);
  }, []);

  return (
    <div className="h-[calc(100vh-60px)] flex bg-gray-50">
      <div className="flex-1 relative">
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-900"
        >
          
          <Controls className="bg-gray-800 border-gray-700" />
          <MiniMap
            nodeColor={(node) => node.data.style?.backgroundColor || '#3b82f6'}
            nodeStrokeColor={(node) => node.data.style?.borderColor || '#1d4ed8'}
            maskColor="rgba(31, 41, 55, 0.6)" // Tailwind gray-800 with transparency
            className="bg-gray-800 border border-gray-700 rounded-lg"
          />
          
        </ReactFlow>
      </div>

      {isDetailsPanelOpen && selectedNode && (
        <DetailsPanel
          node={selectedNode}
          id={id}
          onClose={() => setIsDetailsPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default RoadmapPage;