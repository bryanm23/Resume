import React, { useEffect, useRef, useState } from 'react';
import { Skill } from '../data/resume';

interface Node {
  id: string;
  level: number;
  x: number;
  y: number;
  children: Node[];
  data: {
    name: string;
    proficiency: number;
  };
}

interface SkillTreeProps {
  skills: Skill[];
}

const SkillTree: React.FC<SkillTreeProps> = ({ skills }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Convert skills to tree structure
    const rootNodes: Node[] = skills.map((skill, skillIndex) => ({
      id: `skill-${skillIndex}`,
      level: 0,
      x: (skillIndex + 1) * 200,
      y: 100,
      children: skill.items.map((item, itemIndex) => ({
        id: `skill-${skillIndex}-${itemIndex}`,
        level: 1,
        x: (skillIndex + 1) * 200 + (itemIndex - skill.items.length / 2) * 100,
        y: 250,
        children: [],
        data: {
          name: item,
          proficiency: skill.proficiencyLevel || 3
        }
      })),
      data: {
        name: skill.category,
        proficiency: skill.proficiencyLevel || 3
      }
    }));

    setNodes(rootNodes);
  }, [skills]);

  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw connections
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
    ctx.lineWidth = 2;

    nodes.forEach(parent => {
      parent.children.forEach(child => {
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(child.x, child.y);
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    });
  }, [nodes, hoveredNode]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node === selectedNode ? null : node);
  };

  const handleNodeHover = (node: Node | null) => {
    setHoveredNode(node);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-900/50 rounded-lg border border-cyan-500/30">
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        className="absolute inset-0"
      />
      
      {nodes.map(node => (
        <React.Fragment key={node.id}>
          <div
            className={`absolute cursor-pointer ${
              hoveredNode?.id === node.id || selectedNode?.id === node.id
                ? 'z-20'
                : 'z-10'
            }`}
            style={{ left: node.x - 50, top: node.y - 25 }}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={() => handleNodeHover(null)}
          >
            <div className="cyber-card w-[100px] p-2 text-center">
              <div className="text-sm text-cyan-400">{node.data.name}</div>
              <div className="cyber-progress mt-2 h-1">
                <div
                  className="cyber-progress-bar"
                  style={{ width: `${(node.data.proficiency / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {node.children.map(child => (
            <div
              key={child.id}
              className={`absolute cursor-pointer ${
                hoveredNode?.id === child.id || selectedNode?.id === child.id
                  ? 'z-20'
                  : 'z-10'
              }`}
              style={{ left: child.x - 40, top: child.y - 20 }}
              onClick={() => handleNodeClick(child)}
              onMouseEnter={() => handleNodeHover(child)}
              onMouseLeave={() => handleNodeHover(null)}
            >
              <div className="cyber-card w-[80px] p-2 text-center">
                <div className="text-xs text-cyan-400">{child.data.name}</div>
                <div className="cyber-progress mt-1 h-1">
                  <div
                    className="cyber-progress-bar"
                    style={{ width: `${(child.data.proficiency / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="cyber-card p-4">
            <h3 className="text-lg text-cyan-400 mb-2">{selectedNode.data.name}</h3>
            <div className="flex items-center mb-2">
              <span className="text-gray-400 text-sm mr-2">Proficiency:</span>
              <div className="flex-1 cyber-progress">
                <div
                  className="cyber-progress-bar"
                  style={{ width: `${(selectedNode.data.proficiency / 5) * 100}%` }}
                />
              </div>
              <span className="text-cyan-400 text-sm ml-2">
                {selectedNode.data.proficiency}/5
              </span>
            </div>
            {selectedNode.children.length > 0 && (
              <div>
                <span className="text-gray-400 text-sm">Related skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedNode.children.map(child => (
                    <span key={child.id} className="cyber-tag">
                      {child.data.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTree; 