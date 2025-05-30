import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {authFetch} from '../utils/authFetch.js'

const initialNodes = [];
const initialEdges = [];

function AdminRoadmapEditor() {
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = () => {
    const id = crypto.randomUUID();
    const newNode = {
      id,
      data: { label: 'New Topic' },
      position: { x: 100, y: 100 },
      style: {
        border: '2px solid #38e54d',
        padding: 10,
        borderRadius: 8,
        background: '#232733',
        color: '#fff',
      },
      description: "",
      resources: []
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveRoadmap = async () => {
    try {
      const response = await authFetch('/api/v1/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          description,
          nodes,
          edges,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create roadmap');
      }

      console.log('Saved nodes:', nodes);
      console.log('Saved edges:', edges);
      alert('Roadmap saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save roadmap.');
    }
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleSelectionChange = useCallback(({ nodes, edges }) => {
    setSelectedNodeId(nodes.length === 1 ? nodes[0].id : null);
    setSelectedEdges(edges);
  }, []);

  const updateNodeLabel = (label) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete') && selectedNodeId) {
        setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
        setSelectedNodeId(null);
      }
      if ((e.key === 'Delete') && selectedEdges.length > 0) {
        setEdges((eds) => eds.filter((edge) => !selectedEdges.some((se) => se.id === edge.id)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, selectedEdges, setNodes, setEdges]);

  // --- UI STARTS HERE ---
  return (
    <div className="min-h-screen bg-[#232733] flex flex-col items-center py-10 px-2">
      <h2 className="text-4xl font-extrabold text-center mb-2">
        <span className="text-[#38e54d]">Admin</span>{" "}
        <span className="text-white">Roadmap Editor</span>
      </h2>
      <p className="text-gray-300 text-center mb-8 max-w-2xl">
        Create and edit your roadmap visually. Add nodes, connect them, and save your progress!
      </p>
      <div className="w-full max-w-3xl bg-[#262b37] rounded-lg p-6 shadow mb-8">
        <input
          type="text"
          placeholder="Roadmap Title"
          className="bg-[#232733] border border-[#232733] focus:border-[#38e54d] text-white p-2 mb-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="bg-[#232733] border border-[#232733] focus:border-[#38e54d] text-white p-2 mb-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-2 mb-2">
          <button
            onClick={addNode}
            className="bg-[#38e54d] hover:bg-[#2ecc40] text-white px-4 py-1 rounded font-semibold transition"
          >
            Add Node
          </button>
          <button
            onClick={saveRoadmap}
            className="bg-[#38e54d] hover:bg-[#2ecc40] text-white px-4 py-1 rounded font-semibold transition"
          >
            Save Roadmap
          </button>
        </div>

        {selectedNode && (
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Edit Label for Node <span className="text-[#38e54d]">{selectedNode.id}</span>:
            </label>
            <input
              type="text"
              className="bg-[#232733] border border-[#232733] focus:border-[#38e54d] text-white p-1 w-full rounded"
              value={selectedNode.data.label}
              onChange={(e) => updateNodeLabel(e.target.value)}
            />
          </div>
        )}
      </div>

      <div style={{ height: 500 }} className="w-full max-w-5xl bg-[#262b37] border border-[#232733] rounded-lg shadow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={handleSelectionChange}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default AdminRoadmapEditor;
