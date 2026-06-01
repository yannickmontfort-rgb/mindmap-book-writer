import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useBookStore } from '../store';
import { MindMapNode as CustomMindMapNode } from '../types';

// Composants personnalisés pour les différents types de nœuds
const RootNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '20px 30px',
    background: '#4a90e2',
    color: 'white',
    borderRadius: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    📖 {data.label}
  </div>
);

const ChapterNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '15px 25px',
    background: '#50c878',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minWidth: '150px'
  }}>
    📚 {data.label}
  </div>
);

const SceneNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px 20px',
    background: '#f39c12',
    color: 'white',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minWidth: '120px'
  }}>
    📝 {data.label}
  </div>
);

const nodeTypes: NodeTypes = {
  root: RootNode,
  chapter: ChapterNode,
  scene: SceneNode,
};

interface MindMapEditorProps {
  onNodeClick?: (nodeId: string, nodeType: string) => void;
}

export const MindMapEditor: React.FC<MindMapEditorProps> = ({ onNodeClick }) => {
  const { mindMapNodes, mindMapEdges, syncToMindMap, syncFromMindMap } = useBookStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState(mindMapNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(mindMapEdges as Edge[]);
  
  // Synchroniser avec le store lors du premier rendu
  useEffect(() => {
    syncToMindMap();
  }, []);
  
  // Mettre à jour les nœuds locaux quand le store change
  useEffect(() => {
    setNodes(mindMapNodes as Node[]);
    setEdges(mindMapEdges as Edge[]);
  }, [mindMapNodes, mindMapEdges, setNodes, setEdges]);
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'scene') {
      // Trouver le chapitre parent
      const parentEdge = edges.find(e => e.target === node.id);
      if (parentEdge && onNodeClick) {
        onNodeClick(node.id, node.type);
      }
    }
  }, [edges, onNodeClick]);
  
  // Synchroniser les changements de position avec le store
  const handleNodesChange = useCallback((changes: any) => {
    onNodesChange(changes);
  }, [onNodesChange]);
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
