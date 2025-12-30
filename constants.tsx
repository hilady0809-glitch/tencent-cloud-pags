import { Course } from './types';
import React from 'react';

export const MOCK_COURSE: Course = {
  id: 'c-101',
  title: '基于扩散模型的生成式 AI',
  description: '掌握生成式 AI 的基础知识，重点关注扩散模型、架构以及在云基础设施上的实际部署。',
  totalModules: 3,
  totalDuration: '4小时 30分钟',
  modules: [
    {
      id: 'm-1',
      title: '模块 1: 概念概览',
      lessons: [
        {
          id: 'l-1-1',
          title: '生成式 AI 简介',
          duration: '15 分钟',
          relatedProducts: [],
          content: `
            <h2>简介</h2>
            <p>生成式 AI 代表了机器学习能力的重大飞跃。与传统的对输入数据进行分类的判别模型不同，生成模型能够创建类似于训练数据的新数据实例。</p>
            <p>在本课程中，我们将探讨将扩散模型与 GAN 和 VAE 区分开来的基础概念。</p>
            <h3>关键学习目标</h3>
            <ul>
              <li>理解判别模型和生成模型之间的区别。</li>
              <li>识别扩散过程的核心组件。</li>
              <li>认识图像生成的行业应用。</li>
            </ul>
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
              <p class="font-bold text-blue-700">注意：</p>
              <p class="text-blue-600">本课程假设您具备 Python 和 PyTorch 的基本熟悉程度。</p>
            </div>
          `
        },
        {
          id: 'l-1-2',
          title: '扩散模型的历史',
          duration: '10 分钟',
          relatedProducts: [],
          content: `
            <h2>简史</h2>
            <p>扩散模型的灵感来自于非平衡热力学。核心思想是通过前向扩散过程系统地破坏数据分布中的结构，然后学习一个能够恢复结构的反向扩散过程。</p>
          `
        }
      ]
    },
    {
      id: 'm-2',
      title: '模块 2: 架构与训练',
      lessons: [
        {
          id: 'l-2-1',
          title: '前向过程 (噪声注入)',
          duration: '25 分钟',
          relatedProducts: [
            { id: 'p-1', name: '弹性计算云 (CVM)', description: '云服务器 (Cloud Virtual Machine) 为您提供安全可靠的弹性计算服务。只需几分钟...', icon: 'server', url: '#' },
            { id: 'p-2', name: '对象存储 (COS)', description: '用于检索任意数量数据的对象存储，提供高扩展性、低成本、可靠和安全的数据存储服务。', icon: 'database', url: '#' }
          ],
          content: `
            <h2>前向过程</h2>
            <p>前向过程，通常表示为 q(x_t | x_{t-1})，是一个马尔可夫链，它根据方差调度逐渐向数据添加高斯噪声。</p>
            <img src="https://picsum.photos/800/400" alt="噪声调度图表" class="rounded-lg shadow-md my-6 w-full object-cover" />
            <p>随着 <code>t</code> 的增加，数据 <code>x_t</code> 接近各向同性高斯分布。</p>
            <h3>数学公式</h3>
            <p>我们使用 beta 参数定义噪声调度。选择一个允许反向过程易于处理的调度至关重要。</p>
          `
        },
        {
          id: 'l-2-2',
          title: '反向过程 (去噪)',
          duration: '30 分钟',
          relatedProducts: [
             { id: 'p-3', name: 'GPU 云服务器', description: '拥有高速计算与图形处理能力的云服务器，适用于视频解码、图形图像工作站等场景。', icon: 'cpu', url: '#' }
          ],
          content: `
            <h2>反向过程</h2>
            <p>奇迹就在这里发生。我们训练一个神经网络来预测每一步添加的噪声，从而有效地允许我们“减去”噪声并恢复图像。</p>
            <p>这需要巨大的计算能力，通常利用 GPU 集群。</p>
          `
        }
      ]
    },
    {
      id: 'm-3',
      title: '模块 3: 实际应用',
      lessons: [
        {
          id: 'l-3-1',
          title: '构建流水线',
          duration: '45 分钟',
          relatedProducts: [
            { id: 'p-4', name: '云函数 (SCF)', description: '无需管理服务器即可运行代码', icon: 'code', url: '#' }
          ],
          content: `
            <h2>设置环境</h2>
            <p>我们将使用云端托管的 Jupyter Notebook 来运行我们的推理流水线。</p>
            <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto my-4"><code>import torch
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")
pipe = pipe.to("cuda")</code></pre>
            <p>确保障您的实例已正确安装 CUDA 驱动程序。</p>
          `
        },
        {
          id: 'l-3-2',
          title: '延迟优化',
          duration: '20 分钟',
          relatedProducts: [],
          content: `
            <h2>优化技术</h2>
            <p>在生产环境中，延迟至关重要。我们将研究量化和模型蒸馏技术以加速推理。</p>
          `
        }
      ]
    }
  ],
  recommendations: [
    {
      id: 'rc-1',
      title: '高级计算机视觉',
      thumbnail: 'https://picsum.photos/300/200?random=1',
      category: '深度学习',
      rating: 4.8
    },
    {
      id: 'rc-2',
      title: '机器学习云基础设施',
      thumbnail: 'https://picsum.photos/300/200?random=2',
      category: 'DevOps',
      rating: 4.6
    },
    {
      id: 'rc-3',
      title: 'Python 数据科学训练营',
      thumbnail: 'https://picsum.photos/300/200?random=3',
      category: '编程',
      rating: 4.9
    }
  ],
  activities: [
    {
        id: 'act-1',
        title: '腾讯云 AI 开发者沙龙 - 上海站',
        image: 'https://picsum.photos/300/150?random=50',
        date: '2024-06-15',
        tag: '线下沙龙'
    },
    {
        id: 'act-2',
        title: '云原生技术公开课：Serverless 最佳实践',
        image: 'https://picsum.photos/300/150?random=51',
        date: '2024-05-20',
        tag: '直播'
    }
  ],
  reviews: [
    {
      id: 'r-1',
      user: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/50/50?random=4',
      rating: 5,
      comment: '将复杂的数学概念分解成易于消化的内容，非常棒。可视化图表非常有帮助。',
      date: '2 天前'
    },
    {
      id: 'r-2',
      user: 'David Chen',
      avatar: 'https://picsum.photos/50/50?random=5',
      rating: 4,
      comment: '内容很好，但我希望模块 2 中有更多的动手实验。',
      date: '1 周前'
    }
  ],
  learners: [
    { id: 'u1', name: '用户_411***722745', avatar: 'https://picsum.photos/40/40?random=20', timeAgo: '6小时前' },
    { id: 'u2', name: '用户1***038', avatar: 'https://picsum.photos/40/40?random=21', timeAgo: '1天前' },
    { id: 'u3', name: '用户_408***691193', avatar: 'https://picsum.photos/40/40?random=22', timeAgo: '6天前' },
    { id: 'u4', name: '用户1***900', avatar: 'https://picsum.photos/40/40?random=23', timeAgo: '7天前' },
    { id: 'u5', name: '用户_402***002937', avatar: 'https://picsum.photos/40/40?random=24', timeAgo: '9天前' }
  ]
};