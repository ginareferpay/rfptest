import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, Wand2, BarChart3, Brain, Sparkles } from 'lucide-react';
import { AIKeySetup } from './AIKeySetup';
import { ContentGenerator } from './ContentGenerator';
import { ReferralAnalyzer } from './ReferralAnalyzer';
import { MarketingAssistant } from './MarketingAssistant';
import { geminiService } from '@/lib/ai/geminiService';

interface AIToolkitProps {
  referralCount: number;
  account: string;
  nftBalance: number;
}

export const AIToolkit = ({ referralCount, account, nftBalance }: AIToolkitProps) => {
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    const checkApiKey = () => {
      const key = geminiService.getApiKey();
      setIsApiKeyConfigured(!!key);
    };

    checkApiKey();
    
    // Check periodically in case key is set in another tab
    const interval = setInterval(checkApiKey, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyConfigured = () => {
    setIsApiKeyConfigured(true);
  };

  if (!isApiKeyConfigured) {
    return (
      <div className="space-y-6">
        <Card className="card-glow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Bot className="w-6 h-6 mr-2 text-primary" />
              مجموعة أدوات الذكاء الاصطناعي
              <Badge variant="secondary" className="mr-2">
                <Sparkles className="w-3 h-3 mr-1" />
                حصري للأعضاء
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-muted rounded-lg border text-center">
                  <Wand2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">مولد المحتوى</h3>
                  <p className="text-sm text-muted-foreground">إنشاء محتوى تسويقي احترافي</p>
                </div>
                <div className="p-4 bg-muted rounded-lg border text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-electric" />
                  <h3 className="font-semibold">محلل الإحالات</h3>
                  <p className="text-sm text-muted-foreground">تحليل وتحسين أداء الإحالات</p>
                </div>
                <div className="p-4 bg-muted rounded-lg border text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-success" />
                  <h3 className="font-semibold">مساعد التسويق</h3>
                  <p className="text-sm text-muted-foreground">استراتيجيات تسويقية ذكية</p>
                </div>
              </div>
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                للوصول إلى أدوات الذكاء الاصطناعي المتقدمة، تحتاج إلى تكوين مفتاح Google Gemini API الخاص بك.
                هذا يضمن أن جميع طلباتك آمنة وخاصة بك.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <AIKeySetup onKeyConfigured={handleKeyConfigured} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2 text-primary" />
              مجموعة أدوات الذكاء الاصطناعي
            </div>
            <Badge variant="secondary" className="flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              مُفعل
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="flex items-center">
                <Wand2 className="w-4 h-4 mr-2" />
                مولد المحتوى
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                محلل الإحالات
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                مساعد التسويق
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <ContentGenerator />
            </TabsContent>

            <TabsContent value="analytics">
              <ReferralAnalyzer 
                referralCount={referralCount}
                account={account}
                nftBalance={nftBalance}
              />
            </TabsContent>

            <TabsContent value="marketing">
              <MarketingAssistant />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};