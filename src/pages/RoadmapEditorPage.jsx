import { authFetch } from '../utils/authFetch';
import { useParams } from "react-router-dom";
import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Save } from 'lucide-react';

import RoadmapNode from '../components/RoadmapNode';
import PropertyPanel from '../components/PropertyPanel';
import EditorToolbar from '../components/EditorToolbar';
import AlignmentTools from '../components/AlignmentTools';
import EdgePropertyPanel from '../components/EdgePropertyPanel';
import { useToast } from '../hooks/use-toast';
import { Fetch } from '../utils/fetch';

const nodeTypes = {
  roadmap: RoadmapNode,
};

export const initialNodes = [
  {
    id: '1',
    type: 'roadmap',
    position: { x: 250, y: 50 },
    data: {
      label: 'Getting Started',
      description: 'Begin your journey here',
      resources: [],
      style: {
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        borderColor: '#1d4ed8',
        borderWidth: 2,
        borderRadius: 8,
        width: 150,
        height: 50,
      },
    },
  },
  {
    id: '2',
    type: 'roadmap',
    position: { x: 250, y: 200 },
    data: {
      label: 'Learn Basics',
      description: 'Master the fundamentals',
      resources: [],
      style: {
        backgroundColor: '#10b981',
        textColor: '#ffffff',
        borderColor: '#047857',
        borderWidth: 2,
        borderRadius: 8,
        width: 150,
        height: 50,
      },
    },
  },
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#64748b', strokeWidth: 2 },
  },
];

const RoadmapEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { id } = useParams();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isPropertyPanelOpen, setIsPropertyPanelOpen] = useState(false);
  const [isEdgePropertyPanelOpen, setIsEdgePropertyPanelOpen] = useState(false);
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
        console.log(body.nodes);
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


  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#64748b', strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    setIsPropertyPanelOpen(true);
    setIsEdgePropertyPanelOpen(false);
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    setIsPropertyPanelOpen(false);
    setIsEdgePropertyPanelOpen(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setIsPropertyPanelOpen(false);
    setIsEdgePropertyPanelOpen(false);
  }, []);

  const updateNodeData = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const updateEdgeData = useCallback((edgeId, newEdgeData) => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === edgeId) {
          return {
            ...edge,
            ...newEdgeData,
          };
        }
        return edge;
      })
    );
  }, [setEdges]);

  const addNode = useCallback((type, style) => {
    if (!reactFlowInstance) return;

    const newNodeId = `node_${Date.now()}`;
    const position = reactFlowInstance.screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const newNode = {
      id: newNodeId,
      type: 'roadmap',
      position,
      data: {
        label: 'New Node',
        description: 'Add your description here',
        resources: [],
        style,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance, setNodes]);

  const deleteSelected = useCallback(() => {
    const selectedNodes = nodes.filter(node => node.selected);
    const selectedEdges = edges.filter(edge => edge.selected);

    if (selectedNodes.length > 0 || selectedEdges.length > 0) {
      const newNodes = nodes.filter(node => !node.selected);
      const newEdges = edges.filter(edge => !edge.selected &&
        !selectedNodes.some(node => edge.source === node.id || edge.target === node.id)
      );

      setNodes(newNodes);
      setEdges(newEdges);
      setSelectedNode(null);
      setSelectedEdge(null);
      setIsPropertyPanelOpen(false);
      setIsEdgePropertyPanelOpen(false);
    }
  });

  // Keyboard shortcutsAdd commentMore actions
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (event.key === 'Delete') {
        event.preventDefault();
        deleteSelected();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges]);

  const alignNodes = useCallback((alignment) => {
    const selectedNodes = nodes.filter(node => node.selected);
    if (selectedNodes.length < 2) return;

    let alignValue;

    switch (alignment) {
      case 'left':
        alignValue = Math.min(...selectedNodes.map(node => node.position.x));
        setNodes((nds) => nds.map((node) =>
          node.selected ? { ...node, position: { ...node.position, x: alignValue } } : node
        ));
        break;
      case 'right':
        alignValue = Math.max(...selectedNodes.map(node => node.position.x + (node.data.style?.width || 200)));
        setNodes((nds) => nds.map((node) =>
          node.selected ? { ...node, position: { ...node.position, x: alignValue - (node.data.style?.width || 200) } } : node
        ));
        break;
      case 'center':
        const centerX = selectedNodes.reduce((sum, node) => sum + node.position.x + (node.data.style?.width || 200) / 2, 0) / selectedNodes.length;
        setNodes((nds) => nds.map((node) =>
          node.selected ? { ...node, position: { ...node.position, x: centerX - (node.data.style?.width || 200) / 2 } } : node
        ));
        break;
      case 'top':
        alignValue = Math.min(...selectedNodes.map(node => node.position.y));
        setNodes((nds) => nds.map((node) =>
          node.selected ? { ...node, position: { ...node.position, y: alignValue } } : node
        ));
        break;
      case 'bottom':
        alignValue = Math.max(...selectedNodes.map(node => node.position.y + (node.data.style?.height || 100)));
        setNodes((nds) => nds.map((node) =>
          node.selected ? { ...node, position: { ...node.position, y: alignValue - (node.data.style?.height || 100) } } : node
        ));
        break;
      case 'middle':
        const centerY = selectedNodes.reduce((sum, node) => sum + node.position.y + (node.data.style?.height || 100) / 2, 0) / selectedNodes.length;
        setNodes((nds) => nds.map((node) =>
          node.selected ? { ...node, position: { ...node.position, y: centerY - (node.data.style?.height || 100) / 2 } } : node
        ));
        break;
    }
  }, [nodes, setNodes]);

  const saveRoadmap = useCallback(async () => {
  // Validate that all nodes have a non-empty label and description
  const invalidNodes = nodes.filter(
    (node) =>
      !node.data?.label?.trim() || !node.data?.description?.trim()
  );

  if (invalidNodes.length > 0) {
    alert("All nodes must have a title and description before saving.");
    toast({
      title: "Validation Error",
      description: "Some nodes are missing a label or description.",
      variant: "destructive",
    });
    return;
  }

  try {
    const response = await authFetch(`/api/v1/roadmap/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roadmapTitle,
        description: roadmapDescription,
        nodes,
        edges,
      }),
    });

    if (response.ok) {
      toast({
        title: "Roadmap Saved!",
        description: `"${roadmapTitle}" has been saved successfully.`,
      });
      alert("Roadmap saved!");
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error('Error saving roadmap:', error);
    alert(`Failed to save: ${error}`);
    toast({
      title: "Save Failed",
      description: "There was an error saving your roadmap. Please try again.",
      variant: "destructive",
    });
  }
}, [nodes, edges, roadmapTitle, roadmapDescription, toast]);


  return (
    <div className="h-[calc(100vh-60px)] flex bg-gray-50">
      <div className="flex-1 relative">
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-900"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} className="bg-gray-900" />Add commentMore actions
          <Controls className="bg-gray-800 border-gray-700" />
          <MiniMap
            nodeColor={(node) => node.data.style?.backgroundColor || '#3b82f6'}
            nodeStrokeColor={(node) => node.data.style?.borderColor || '#1d4ed8'}
            maskColor="rgba(31, 41, 55, 0.6)" // Tailwind gray-800 with transparency
            className="bg-gray-800 border border-gray-700 rounded-lg"
          />

          <Panel position="top-left" className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                <input
                  type="text"
                  value={roadmapTitle}
                  onChange={(e) => {
                    setRoadmapTitle(e.target.value);
                    localStorage.setItem('currentRoadmapTitle', e.target.value);
                  }}
                  className="px-2 py-1 border border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48  bg-gray-700 text-white select-none"
                  placeholder="Roadmap title"
                />
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                <button
                  onClick={saveRoadmap}
                  className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm select-none"
                >
                  <Save size={16} className="mr-1" />
                  Save
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <EditorToolbar onAddNode={addNode} />
            </div>
          </Panel>


          <Panel position='top-center'>
            <AlignmentTools onAlign={alignNodes} selectedCount={nodes.filter(n => n.selected).length} />
          </Panel>


          <Panel position="top-right">
            {selectedNode && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                <button
                  onClick={deleteSelected}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Delete Node
                </button>
              </div>
            )}
          </Panel>
        </ReactFlow>
      </div>

      {isPropertyPanelOpen && selectedNode && (
        <PropertyPanel
          node={selectedNode}
          onUpdateNode={updateNodeData}
          onClose={() => setIsPropertyPanelOpen(false)}
        />
      )}

      {isEdgePropertyPanelOpen && selectedEdge && (
        <EdgePropertyPanel
          edge={selectedEdge}
          onUpdateEdge={updateEdgeData}
          onClose={() => setIsEdgePropertyPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default RoadmapEditor;