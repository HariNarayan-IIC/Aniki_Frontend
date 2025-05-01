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
    const id = crypto.randomUUID(); // or use Date.now().toString() as a fallback
    const newNode = {
      id,
      data: { label: 'New Topic' },
      position: { x: 100, y: 100 },
      style: {
        border: '2px solid black',
        padding: 10,
        borderRadius: 8,
        background: '#fff',
      },
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


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Admin Roadmap Editor</h2>
      <input
        type="text"
        placeholder="Roadmap Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-2 mb-2">
        <button onClick={addNode} className="bg-blue-500 text-white px-4 py-1 rounded">
          Add Node
        </button>
        <button onClick={saveRoadmap} className="bg-green-600 text-white px-4 py-1 rounded">
          Save Roadmap
        </button>
      </div>

      {selectedNode && (
  <div className="mb-2">
    <label className="block text-sm font-medium">
      Edit Label for Node {selectedNode.id}:
    </label>
    <input
      type="text"
      className="border p-1 w-full"
      value={selectedNode.data.label}
      onChange={(e) => updateNodeLabel(e.target.value)}
    />
  </div>
)}

      <div style={{ height: 500 }} className="border rounded">
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

// import { useState, useCallback, useRef } from 'react';
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   MiniMap,
//   Panel,
//   useNodesState,
//   useEdgesState,
//   MarkerType
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// // Custom Node Component
// const RoadmapNode = ({ data, isConnectable }) => {
//   return (
//     <div className="p-3 rounded-md shadow-md bg-white border-2 border-gray-300 w-48">
//       <div className="text-center font-bold mb-2">{data.label}</div>
//       <div className="flex justify-center space-x-2">
//         <button
//           className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs"
//           onClick={data.onEdit}
//         >
//           Edit
//         </button>
//         <button
//           className="px-2 py-1 bg-red-500 text-white rounded-md text-xs"
//           onClick={data.onDelete}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// // Define the node types
// const nodeTypes = {
//   roadmapNode: RoadmapNode,
// };

// // Initialize nodes and edges
// const initialNodes = [
//   {
//     id: '1',
//     type: 'roadmapNode',
//     position: { x: 250, y: 100 },
//     data: { label: 'Research Phase' },
//   },
//   {
//     id: '2',
//     type: 'roadmapNode',
//     position: { x: 250, y: 250 },
//     data: { label: 'Development' },
//   },
// ];

// const initialEdges = [
//   {
//     id: 'e1-2',
//     source: '1',
//     target: '2',
//     animated: true,
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//     },
//   },
// ];

// const RoadmapEditor = () => {
//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [nodeName, setNodeName] = useState('');
//   const [editingNode, setEditingNode] = useState(null);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
//   // Connect two nodes with an edge
//   const onConnect = useCallback(
//     (params) => {
//       const newEdge = {
//         ...params,
//         animated: true,
//         markerEnd: {
//           type: MarkerType.ArrowClosed,
//         },
//       };
//       setEdges((eds) => addEdge(newEdge, eds));
//     },
//     [setEdges]
//   );

//   // Add a new node
//   const addNode = () => {
//     if (!nodeName) return;
    
//     const newNode = {
//       id: `${nodes.length + 1}`,
//       type: 'roadmapNode',
//       position: {
//         x: Math.random() * 300 + 100,
//         y: Math.random() * 300 + 100,
//       },
//       data: {
//         label: nodeName,
//         onEdit: () => startEditingNode(`${nodes.length + 1}`),
//         onDelete: () => deleteNode(`${nodes.length + 1}`),
//       },
//     };
    
//     setNodes((nds) => [...nds, newNode]);
//     setNodeName('');
//   };

//   // Start editing a node's title
//   const startEditingNode = (nodeId) => {
//     const node = nodes.find((n) => n.id === nodeId);
//     if (node) {
//       setEditingNode(nodeId);
//       setNodeName(node.data.label);
//     }
//   };

//   // Save edited node title
//   const saveNodeEdit = () => {
//     if (!editingNode || !nodeName) return;
    
//     setNodes((nds) =>
//       nds.map((node) => {
//         if (node.id === editingNode) {
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               label: nodeName,
//             },
//           };
//         }
//         return node;
//       })
//     );
    
//     setEditingNode(null);
//     setNodeName('');
//   };

//   // Delete a node
//   const deleteNode = (nodeId) => {
//     setNodes((nds) => nds.filter((node) => node.id !== nodeId));
//     setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));

//     // If deleting the node being edited, clear editing state
//     if (editingNode === nodeId) {
//       setEditingNode(null);
//       setNodeName('');
//     }
//   };

//   // Update all nodes with their onEdit and onDelete handlers
//   const updateNodeHandlers = useCallback(() => {
//     setNodes((nds) =>
//       nds.map((node) => {
//         return {
//           ...node,
//           data: {
//             ...node.data,
//             onEdit: () => startEditingNode(node.id),
//             onDelete: () => deleteNode(node.id),
//           },
//         };
//       })
//     );
//   }, []);

//   // When the component mounts, update all node handlers
//   useState(() => {
//     updateNodeHandlers();
//   }, []);

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   }, []);

//   return (
//     <div className="w-full h-screen" ref={reactFlowWrapper}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         onInit={setReactFlowInstance}
//         fitView
//         onDragOver={onDragOver}
//       >
//         <Controls />
//         <MiniMap nodeColor="#aaa" zoomable pannable />
//         <Background variant="dots" gap={12} size={1} />
        
//         <Panel position="top-left" className="bg-white p-4 rounded-md shadow-md">
//           <div className="mb-4 font-bold text-lg text-center">Roadmap Editor</div>
//           <div className="flex flex-col space-y-2">
//             <input
//               type="text"
//               value={nodeName}
//               onChange={(e) => setNodeName(e.target.value)}
//               placeholder="Enter milestone name"
//               className="border p-2 rounded-md"
//             />
//             {editingNode ? (
//               <div className="flex space-x-2">
//                 <button
//                   onClick={saveNodeEdit}
//                   className="bg-green-500 text-white px-4 py-2 rounded-md flex-1"
//                 >
//                   Save Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEditingNode(null);
//                     setNodeName('');
//                   }}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md flex-1"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={addNode}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 disabled={!nodeName}
//               >
//                 Add Milestone
//               </button>
//             )}
//           </div>
//           <div className="mt-4 text-sm text-gray-600">
//             <p>• Drag nodes to reposition</p>
//             <p>• Connect nodes by dragging from handle to handle</p>
//             <p>• Delete edges by selecting and pressing Delete</p>
//           </div>
//         </Panel>
//       </ReactFlow>
//     </div>
//   );
// };

// export default function AdminRoadmapEditor() {
//   return (
//     <div className="w-full h-screen">
//       <RoadmapEditor />
//     </div>
//   );
// }


