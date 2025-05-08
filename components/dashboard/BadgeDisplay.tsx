'use client'

import { Award, Calendar, Clock, Crown, Medal, Star, Trophy, TrendingUp, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// Badge icon mapping
const badgeIcons: Record<string, any> = {
  'wand': Zap,
  'star': Star,
  'scroll': Award,
  'wizard-hat': Award,
  'calendar': Calendar,
  'clock': Clock,
  'trophy': Trophy,
  'streak': Calendar,
  'arrow-up': TrendingUp,
  'crown': Crown
}

// Badge tier colors
const badgeTierColors: Record<string, string> = {
  'bronze': 'bg-amber-700',
  'silver': 'bg-gray-400',
  'gold': 'bg-yellow-500',
  'platinum': 'bg-purple-600'
}

interface BadgeData {
  id: number
  name: string
  description: string
  icon: string
  category: string
  tier: string
  earned_at?: string
}

interface BadgeDisplayProps {
  badge: BadgeData
  size?: 'sm' | 'md' | 'lg'
  showDate?: boolean
  showTier?: boolean
}

export default function BadgeDisplay({ 
  badge, 
  size = 'md', 
  showDate = false,
  showTier = true
}: BadgeDisplayProps) {
  const BadgeIcon = badgeIcons[badge.icon] || Award
  
  const sizeClasses = {
    sm: {
      container: 'p-2',
      iconContainer: 'h-8 w-8',
      icon: 'h-4 w-4',
      title: 'text-sm',
      description: 'text-xs'
    },
    md: {
      container: 'p-3',
      iconContainer: 'h-10 w-10',
      icon: 'h-5 w-5',
      title: 'text-base',
      description: 'text-sm'
    },
    lg: {
      container: 'p-4',
      iconContainer: 'h-12 w-12',
      icon: 'h-6 w-6',
      title: 'text-lg',
      description: 'text-base'
    }
  }
  
  const classes = sizeClasses[size]
  
  return (
    <div className={`flex items-start bg-white rounded-lg ${classes.container} border border-amber-200`}>
      <div className={`${classes.iconContainer} rounded-full flex items-center justify-center mr-3 text-white ${badgeTierColors[badge.tier]}`}>
        <BadgeIcon className={classes.icon} />
      </div>
      <div>
        <h4 className={`font-medium text-amber-900 ${classes.title}`}>{badge.name}</h4>
        <p className={`text-amber-700 ${classes.description}`}>{badge.description}</p>
        
        {showDate && badge.earned_at && (
          <p className="text-xs text-amber-600 mt-1">
            Earned on {new Date(badge.earned_at).toLocaleDateString()}
          </p>
        )}
        
        {showTier && (
          <Badge className={`mt-2 ${badgeTierColors[badge.tier]} text-white`}>
            {badge.tier.charAt(0).toUpperCase() + badge.tier.slice(1)}
          </Badge>
        )}
      </div>
    </div>
  )
}
