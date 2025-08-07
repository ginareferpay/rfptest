import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Megaphone, 
  Target, 
  TrendingUp, 
  Copy,
  RefreshCw,
  Send,
  Brain
} from 'lucide-react';
import { geminiService, ChatMessage } from '@/lib/ai/geminiService';
import { useToast } from '@/hooks/use-toast';

const campaignTypes = [
  { value: 'awareness', label: 'زيادة الوعي', description: 'حملة لنشر الوعي بالعلامة التجارية' },
  { value: 'conversion', label: 'زيادة التحويل', description: 'حملة لزيادة المبيعات والتحويلات' },
  { value: 'engagement', label: 'زيادة التفاعل', description: 'حملة لزيادة المشاركة والتفاعل' },
  { value: 'retention', label: 'الاحتفاظ بالعملاء', description: 'حملة للاحتفاظ بالعملاء الحاليين' }
];

const platforms = [
  { value: 'twitter', label: 'تويتر' },
  { value: 'linkedin', label: 'لينكد إن' },
  { value: 'instagram', label: 'إنستغرام' },
  { value: 'facebook', label: 'فيسبوك' },
  { value: 'telegram', label: 'تليغرام' },
  { value: 'email', label: 'البريد الإلكتروني' }
];

export const MarketingAssistant = () => {
  const [activeTab, setActiveTab] = useState('strategy');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strategy, setStrategy] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [targetPlatform, setTargetPlatform] = useState('');
  const [generatedStrategy, setGeneratedStrategy] = useState('');
  const { toast } = useToast();

  const generateStrategy = async () => {
    if (!campaignType || !targetPlatform) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار نوع الحملة والمنصة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const selectedCampaign = campaignTypes.find(c => c.value === campaignType);
      const selectedPlatform = platforms.find(p => p.value === targetPlatform);

      const context = `أنت استشاري تسويق رقمي خبير متخصص في Web3 والعملات المشفرة. 

المطلوب: إنشاء استراتيجية تسويقية شاملة لمشروع ReferPay

تفاصيل المشروع:
- منصة إحالة Web3 مع مكافآت USDC
- نظام NFT للأعضاء المؤسسين
- يستهدف مجتمع العملات المشفرة والمستثمرين

نوع الحملة: ${selectedCampaign?.label} - ${selectedCampaign?.description}
المنصة المستهدفة: ${selectedPlatform?.label}

اكتب استراتيجية شاملة تتضمن:
1. تحليل الجمهور المستهدف
2. الرسائل الأساسية
3. خطة المحتوى (5-7 أفكار)
4. الجدول الزمني المقترح
5. مؤشرات الأداء الرئيسية
6. الميزانية المقترحة (إذا كان مناسباً)
7. نصائح لتحسين النتائج

اكتب باللغة العربية بأسلوب احترافي وعملي.`;

      const prompt = strategy || 'أنشئ استراتيجية تسويقية شاملة ومبتكرة';

      const response = await geminiService.generateContent(prompt, context);
      setGeneratedStrategy(response.content);
      
      toast({
        title: "تم إنشاء الاستراتيجية",
        description: "تم إنشاء استراتيجية تسويقية شاملة"
      });
    } catch (error: any) {
      toast({
        title: "خطأ في الإنشاء",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const context = `أنت مساعد تسويق ذكي متخصص في Web3 والتسويق الرقمي. 
      
مشروع ReferPay:
- منصة إحالة لامركزية مع مكافآت USDC
- نظام NFT للعضوية المؤسسة
- يستهدف مستثمري العملات المشفرة

قدم إجابات عملية ومفصلة باللغة العربية. ركز على الاستراتيجيات المجربة والقابلة للتطبيق.`;

      const response = await geminiService.chat([
        { role: 'assistant', content: context, timestamp: new Date() },
        ...updatedMessages
      ]);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      };

      setChatMessages([...updatedMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "خطأ في المحادثة",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى إلى الحافظة"
    });
  };

  const clearChat = () => {
    setChatMessages([]);
    toast({
      title: "تم مسح المحادثة",
      description: "تم حذف جميع الرسائل"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            مساعد التسويق الذكي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="strategy">مولد الاستراتيجيات</TabsTrigger>
              <TabsTrigger value="chat">محادثة ذكية</TabsTrigger>
            </TabsList>

            <TabsContent value="strategy" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    نوع الحملة
                  </label>
                  <Select value={campaignType} onValueChange={setCampaignType}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحملة" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    المنصة المستهدفة
                  </label>
                  <Select value={targetPlatform} onValueChange={setTargetPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنصة" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map(platform => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  متطلبات إضافية (اختيارية)
                </label>
                <Textarea
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="أضف أي متطلبات أو تفاصيل إضافية للاستراتيجية..."
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                onClick={generateStrategy}
                disabled={isLoading || !campaignType || !targetPlatform}
                className="w-full btn-gradient text-primary-foreground"
              >
                {isLoading ? 'جارٍ إنشاء الاستراتيجية...' : 'إنشاء استراتيجية تسويقية'}
              </Button>

              {generatedStrategy && (
                <Card className="card-glow mt-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Megaphone className="w-5 h-5 mr-2 text-success" />
                        الاستراتيجية التسويقية
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedStrategy)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={generateStrategy}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Badge variant="secondary">جاهزة للتطبيق</Badge>
                      <div className="p-4 bg-muted rounded-lg border text-foreground whitespace-pre-wrap">
                        {generatedStrategy}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="chat" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  مساعد تسويق ذكي
                </Badge>
                {chatMessages.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearChat}>
                    مسح المحادثة
                  </Button>
                )}
              </div>

              <Card className="card-glow min-h-[400px]">
                <CardContent className="p-4">
                  <div className="space-y-4 max-h-[350px] overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>ابدأ محادثة مع مساعد التسويق الذكي</p>
                        <p className="text-sm mt-1">اسأل عن استراتيجيات التسويق، إنشاء المحتوى، أو أي شيء متعلق بالتسويق الرقمي</p>
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-foreground'
                          }`}>
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            <div className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString('ar-SA')}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-foreground p-3 rounded-lg">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                            <span>جارٍ الكتابة...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-2 space-x-reverse">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="اسأل عن أي شيء متعلق بالتسويق..."
                  className="flex-1 min-h-[60px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendChatMessage();
                    }
                  }}
                />
                <Button 
                  onClick={sendChatMessage}
                  disabled={isLoading || !currentMessage.trim()}
                  className="btn-gradient text-primary-foreground px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};