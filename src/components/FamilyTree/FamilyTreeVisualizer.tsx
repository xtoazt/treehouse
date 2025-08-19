import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
} from 'reactflow';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Plus, 
  Settings, 
  Download, 
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Edit3
} from 'lucide-react';
import { FamilyMember, Relationship } from '../../types';
import { AnimatePresence } from 'framer-motion';

// Custom Node Component
const FamilyMemberNode: React.FC<any> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className={`
        p-4 rounded-2xl shadow-lg border-2 transition-all duration-200
        ${data.gender === 'male' 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' 
          : 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200'
        }
        ${isHovered ? 'shadow-xl' : 'shadow-lg'}
      `}>
        {/* Avatar */}
        <div className="flex items-center space-x-3 mb-3">
          <div className={`
            h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg
            ${data.gender === 'male' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
              : 'bg-gradient-to-r from-pink-500 to-pink-600'
            }
          `}>
            {data.photoURL ? (
              <img src={data.photoURL} alt={data.firstName} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              data.firstName.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {data.firstName} {data.lastName}
            </h3>
            <p className="text-xs text-gray-600">
              {data.birthDate ? new Date(data.birthDate).getFullYear() : 'Unknown'} - {data.isAlive ? 'Present' : 'Deceased'}
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-1">
          {data.occupation && (
            <p className="text-xs text-gray-600">{data.occupation}</p>
          )}
          {data.currentLocation && (
            <p className="text-xs text-gray-600 flex items-center">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              {data.currentLocation}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute top-2 right-2 flex space-x-1"
        >
          <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Eye className="h-3 w-3 text-gray-600" />
          </button>
          <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Edit3 className="h-3 w-3 text-gray-600" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const nodeTypes: NodeTypes = {
  familyMember: FamilyMemberNode,
};

const FamilyTreeVisualizer: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'timeline' | 'network'>('tree');

  // Mock data
  const mockMembers: FamilyMember[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      gender: 'male',
      birthDate: new Date('1950-01-15'),
      isAlive: true,
      occupation: 'Engineer',
      currentLocation: 'New York, NY',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user1',
      tags: []
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Smith',
      gender: 'female',
      birthDate: new Date('1952-03-20'),
      isAlive: true,
      occupation: 'Teacher',
      currentLocation: 'New York, NY',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user1',
      tags: []
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Smith',
      gender: 'male',
      birthDate: new Date('1980-07-10'),
      isAlive: true,
      occupation: 'Software Developer',
      currentLocation: 'San Francisco, CA',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user1',
      tags: []
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      birthDate: new Date('1982-11-05'),
      isAlive: true,
      occupation: 'Designer',
      currentLocation: 'San Francisco, CA',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user1',
      tags: []
    },
    {
      id: '5',
      firstName: 'Emma',
      lastName: 'Smith',
      gender: 'female',
      birthDate: new Date('2010-04-15'),
      isAlive: true,
      occupation: 'Student',
      currentLocation: 'San Francisco, CA',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user1',
      tags: []
    }
  ];

  const mockRelationships: Relationship[] = [
    {
      id: '1',
      person1Id: '1',
      person2Id: '2',
      relationshipType: 'spouse',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      person1Id: '1',
      person2Id: '3',
      relationshipType: 'parent-child',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      person1Id: '2',
      person2Id: '3',
      relationshipType: 'parent-child',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      person1Id: '3',
      person2Id: '4',
      relationshipType: 'spouse',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      person1Id: '3',
      person2Id: '5',
      relationshipType: 'parent-child',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      person1Id: '4',
      person2Id: '5',
      relationshipType: 'parent-child',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Initialize nodes and edges
  React.useEffect(() => {
    const initialNodes: Node[] = mockMembers.map((member, index) => ({
      id: member.id,
      type: 'familyMember',
      position: { x: index * 250, y: Math.floor(index / 2) * 200 },
      data: member,
    }));

    const initialEdges: Edge[] = mockRelationships.map((rel) => ({
      id: rel.id,
      source: rel.person1Id,
      target: rel.person2Id,
      type: 'smoothstep',
      style: {
        stroke: rel.relationshipType === 'spouse' ? '#ec4899' : '#3b82f6',
        strokeWidth: 2,
      },
      label: rel.relationshipType === 'spouse' ? 'Spouse' : 'Parent-Child',
    }));

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="h-5 w-5 text-primary-600" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Download className="h-5 w-5 text-gray-600" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Share2 className="h-5 w-5 text-gray-600" />
        </motion.button>
      </div>

      {/* View Mode Selector */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white rounded-xl shadow-lg p-1">
          <div className="flex space-x-1">
            {[
              { key: 'tree', label: 'Tree', icon: Users },
              { key: 'timeline', label: 'Timeline', icon: Heart },
              { key: 'network', label: 'Network', icon: Share2 }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key as any)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${viewMode === mode.key
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <mode.icon className="h-4 w-4 inline mr-2" />
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Family Tree Canvas */}
      <div className="h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background color="#f1f5f9" gap={20} />
          <MiniMap
            nodeColor={(node) => {
              return node.data?.gender === 'male' ? '#3b82f6' : '#ec4899';
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>

      {/* Selected Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 w-80 bg-white rounded-2xl shadow-xl p-6 z-20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Member Details</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`
                  h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-xl
                  ${selectedNode.data?.gender === 'male' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-pink-500 to-pink-600'
                  }
                `}>
                  {selectedNode.data?.firstName?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedNode.data?.firstName} {selectedNode.data?.lastName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedNode.data?.birthDate ? new Date(selectedNode.data.birthDate).getFullYear() : 'Unknown'} - {selectedNode.data?.isAlive ? 'Present' : 'Deceased'}
                  </p>
                </div>
              </div>

              {selectedNode.data?.occupation && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Occupation</p>
                  <p className="text-sm text-gray-600">{selectedNode.data.occupation}</p>
                </div>
              )}

              {selectedNode.data?.currentLocation && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-sm text-gray-600">{selectedNode.data.currentLocation}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <button className="w-full btn-primary">
                  Edit Member
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Panel */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{nodes.length}</p>
              <p className="text-xs text-gray-600">Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{edges.length}</p>
              <p className="text-xs text-gray-600">Relationships</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-600">Generations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTreeVisualizer;
