import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key, ExternalLink, Shield } from 'lucide-react';
import { geminiService } from '@/lib/ai/geminiService';
import { useToast } from '@/hooks/use-toast';

interface AIKeySetupProps {
  onKeyConfigured: () => void;
}

export const AIKeySetup = ({ onKeyConfigured }: AIKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const handleSetupKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مفتاح API",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Test the API key with a simple request
      const testPrompt = "Hello, please respond with 'API key working correctly'";
      
      // Temporarily set the key for testing
      const tempService = Object.create(geminiService);
      tempService.apiKey = apiKey;
      
      await tempService.generateContent(testPrompt);
      
      // If test successful, store the key
      const success = await geminiService.setApiKey(apiKey);
      
      if (success) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم تكوين مفتاح API بنجاح"
        });
        onKeyConfigured();
      } else {
        throw new Error('Failed to store API key');
      }
    } catch (error: any) {
      toast({
        title: "خطأ في المفتاح",
        description: error.message || "مفتاح API غير صحيح أو منتهي الصلاحية",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="card-glow max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Key className="w-6 h-6 mr-2 text-primary" />
          إعداد مفتاح Google Gemini API
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Shield className="w-4 h-4" />
          <AlertDescription>
            مفتاح API الخاص بك يُحفظ بشكل آمن في متصفحك ولا يُرسل إلى خوادمنا.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              مفتاح Google Gemini API
            </label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-1 top-1 h-8 w-8"
                onClick={() => setShowKey(!showKey)}
              >
                👁️
              </Button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h4 className="font-medium text-foreground">كيفية الحصول على مفتاح API:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>اذهب إلى Google AI Studio</li>
              <li>قم بتسجيل الدخول بحساب Google</li>
              <li>انقر على "Get API Key" أو "إنشاء مفتاح API"</li>
              <li>انسخ المفتاح والصقه هنا</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://aistudio.google.com/apikey', '_blank')}
              className="mt-2"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              فتح Google AI Studio
            </Button>
          </div>

          <Button 
            onClick={handleSetupKey}
            disabled={isLoading || !apiKey.trim()}
            className="w-full btn-gradient text-primary-foreground"
          >
            {isLoading ? 'جارٍ التحقق...' : 'حفظ وتفعيل الذكاء الاصطناعي'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};