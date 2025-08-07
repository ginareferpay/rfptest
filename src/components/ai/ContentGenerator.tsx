import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Wand2, Download, Share } from 'lucide-react';
import { geminiService } from '@/lib/ai/geminiService';
import { useToast } from '@/hooks/use-toast';

const contentTypes = [
  { value: 'social_post', label: 'منشور وسائل التواصل', prompt: 'إنشاء منشور جذاب لوسائل التواصل الاجتماعي' },
  { value: 'email', label: 'رسالة بريد إلكتروني', prompt: 'كتابة رسالة بريد إلكتروني احترافية' },
  { value: 'article', label: 'مقال', prompt: 'كتابة مقال شامل ومفيد' },
  { value: 'press_release', label: 'بيان صحفي', prompt: 'إنشاء بيان صحفي احترافي' },
  { value: 'product_description', label: 'وصف منتج', prompt: 'كتابة وصف منتج مقنع' }
];

const tones = [
  { value: 'professional', label: 'احترافي' },
  { value: 'friendly', label: 'ودود' },
  { value: 'persuasive', label: 'مقنع' },
  { value: 'casual', label: 'عادي' },
  { value: 'urgent', label: 'عاجل' }
];

export const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('');
  const [tone, setTone] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال وصف المحتوى المطلوب",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const selectedType = contentTypes.find(t => t.value === contentType);
      const selectedTone = tones.find(t => t.value === tone);
      
      const context = `أنت خبير في التسويق الرقمي والكتابة الإبداعية. مهمتك هي إنشاء محتوى عالي الجودة باللغة العربية.

نوع المحتوى: ${selectedType?.label || 'عام'}
النبرة المطلوبة: ${selectedTone?.label || 'احترافية'}

المتطلبات:
- اكتب باللغة العربية الفصحى
- اجعل المحتوى جذاباً ومقنعاً
- استخدم كلمات مفتاحية مناسبة لـ SEO
- اجعل المحتوى مناسباً للجمهور العربي
- تأكد من أن المحتوى أصلي ومبتكر

الموضوع أو الفكرة:`;

      const response = await geminiService.generateContent(prompt, context);
      setGeneratedContent(response.content);
      
      toast({
        title: "تم إنشاء المحتوى",
        description: `تم استخدام ${response.usage.inputTokens + response.usage.outputTokens} رمز`
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى إلى الحافظة"
    });
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-content-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "تم التحميل",
      description: "تم تحميل المحتوى كملف نصي"
    });
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'محتوى تم إنشاؤه بالذكاء الاصطناعي',
        text: generatedContent
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="w-5 h-5 mr-2 text-primary" />
            مولد المحتوى التسويقي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                نوع المحتوى
              </label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المحتوى" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                نبرة المحتوى
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النبرة" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map(tone => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              وصف المحتوى المطلوب
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اكتب وصفاً مفصلاً للمحتوى الذي تريد إنشاءه..."
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={generateContent}
            disabled={isLoading || !prompt.trim()}
            className="w-full btn-gradient text-primary-foreground"
          >
            {isLoading ? 'جارٍ الإنشاء...' : 'إنشاء المحتوى'}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="card-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>المحتوى المُنشأ</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={downloadContent}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={shareContent}>
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Badge variant="secondary">جاهز للاستخدام</Badge>
              <div className="p-4 bg-muted rounded-lg border text-foreground whitespace-pre-wrap">
                {generatedContent}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};