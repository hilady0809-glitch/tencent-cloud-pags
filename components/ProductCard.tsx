import React from 'react';
import { Product } from '../types';
import { ExternalLink, Server, Database, Cloud, Cpu, Code } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

// Icon mapping helper
const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'server': return <Server className="text-orange-500" />;
        case 'database': return <Database className="text-blue-500" />;
        case 'cpu': return <Cpu className="text-purple-500" />;
        case 'code': return <Code className="text-green-500" />;
        default: return <Cloud className="text-slate-500" />;
    }
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all bg-white group cursor-pointer">
      <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
        {getIcon(product.icon)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h4>
            <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
        <p className="text-sm text-slate-500 mt-1">{product.description}</p>
      </div>
    </div>
  );
};